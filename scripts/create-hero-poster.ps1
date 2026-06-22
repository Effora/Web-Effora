Add-Type -AssemblyName System.Drawing

$video = Join-Path $PSScriptRoot "..\assets\videos\effora-hero-reel.mp4"
$poster = Join-Path $PSScriptRoot "..\assets\videos\effora-hero-poster.jpg"
$fallback = Join-Path $PSScriptRoot "..\assets\projects\oube-landing-new-sm.jpg"

if (-not (Test-Path $video)) {
  Write-Warning "Video missing: $video"
  exit 1
}

$ffmpeg = $null
foreach ($cmd in @("ffmpeg", "C:\ffmpeg\bin\ffmpeg.exe")) {
  if (Get-Command $cmd -ErrorAction SilentlyContinue) { $ffmpeg = $cmd; break }
}

if ($ffmpeg) {
  & $ffmpeg -y -ss 00:00:00.5 -i $video -vframes 1 -q:v 2 -vf "scale=540:-2" $poster 2>$null
  if (Test-Path $poster) {
    Write-Host "OK poster from ffmpeg"
    exit 0
  }
}

if (Test-Path $fallback) {
  Copy-Item $fallback $poster -Force
  Write-Host "OK poster from fallback image"
  exit 0
}

Write-Warning "Could not create poster"
