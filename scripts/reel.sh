#!/bin/bash
# Prépare un réel Instagram pour écrire un article : vidéo, légende, transcription, images.
# Usage : scripts/reel.sh <lien-du-reel> <dossier-de-sortie>
# Outils : brew install yt-dlp ffmpeg whisper-cpp + modèle dans ~/.cache/whisper-cpp/
set -euo pipefail

URL="${1:?Lien du réel manquant}"
OUT="${2:?Dossier de sortie manquant}"
export PATH="/opt/homebrew/bin:$PATH"
MODEL="${WHISPER_MODEL:-$HOME/.cache/whisper-cpp/ggml-large-v3-turbo-q5_0.bin}"

mkdir -p "$OUT/images"
cd "$OUT"

# 1. Téléchargement (sans connexion, puis avec la session Instagram de Chrome, puis de Safari)
dl() { yt-dlp -q --no-warnings -f "bv*+ba/b" -S "res,br" --merge-output-format mp4 -o "video.%(ext)s" --write-info-json --write-thumbnail --convert-thumbnails jpg "$@" "$URL"; }
dl || dl --cookies-from-browser chrome || dl --cookies-from-browser safari || {
  echo "ÉCHEC : Instagram bloque le téléchargement. Se connecter à Instagram dans Chrome ou Safari, puis relancer." >&2
  exit 1
}
VIDEO=$(ls video.* | grep -v -E '\.(json|jpg)$' | head -1)

# 2. Infos du réel
python3 - <<'PY'
import json
d = json.load(open("video.info.json"))
date = d.get("upload_date") or ""
infos = {
    "url": d.get("webpage_url"),
    "auteur": d.get("uploader") or d.get("channel"),
    "date": f"{date[:4]}-{date[4:6]}-{date[6:]}" if date else None,
    "duree_s": d.get("duration"),
    "likes": d.get("like_count"),
    "legende": d.get("description") or d.get("title"),
}
json.dump(infos, open("infos.json", "w"), ensure_ascii=False, indent=2)
PY

# 3. Transcription en français
ffmpeg -loglevel error -y -i "$VIDEO" -ar 16000 -ac 1 audio.wav
if [ -f "$MODEL" ]; then
  whisper-cli -m "$MODEL" -l fr -nt -otxt -of transcription audio.wav >/dev/null 2>&1 || echo "(transcription impossible)" > transcription.txt
else
  echo "(modèle whisper absent : $MODEL)" > transcription.txt
fi

# 4. Images : une toutes les 2 s (aperçu en 720 px de large) + la vignette du réel
ffmpeg -loglevel error -y -i "$VIDEO" -vf "fps=1/2,scale=720:-2" -q:v 3 images/image-%02d.jpg
[ -f video.jpg ] && mv video.jpg vignette.jpg

echo "OK : $OUT"
echo "- infos.json (légende, date, durée)"
echo "- transcription.txt ($(wc -w < transcription.txt | tr -d ' ') mots)"
echo "- images/ ($(ls images | wc -l | tr -d ' ') images), vignette.jpg"
