Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$video = Join-Path $root "assets\videos\effora-hero-reel.mp4"
$poster = Join-Path $root "assets\videos\effora-hero-frame.jpg"
$logoPath = Join-Path $root "assets\effora-logo-sm.png"

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

if (-not (Test-Path $logoPath)) {
  Write-Warning "Logo missing: $logoPath"
  exit 1
}

$width = 540
$height = 960
$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.Clear([System.Drawing.Color]::FromArgb(255, 13, 16, 20))

$logo = [System.Drawing.Image]::FromFile($logoPath)
$logoSize = 120
$x = [int](($width - $logoSize) / 2)
$y = [int](($height - $logoSize) / 2)
$graphics.DrawImage($logo, $x, $y, $logoSize, $logoSize)
$logo.Dispose()
$graphics.Dispose()

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 85)
$tempPoster = Join-Path $env:TEMP ("effora-hero-poster-" + [guid]::NewGuid().ToString() + ".jpg")
$bitmap.Save($tempPoster, $encoder, $encoderParams)
$bitmap.Dispose()
$target = Join-Path $root "assets\videos\effora-hero-frame.jpg"
Copy-Item $tempPoster $target -Force
Remove-Item $tempPoster -Force

Write-Host "OK poster from Effora logo on dark background"
