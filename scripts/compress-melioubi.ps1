Add-Type -AssemblyName System.Drawing

$dir = Join-Path $PSScriptRoot "..\assets\projects"

function Compress-ImageFile {
  param([string]$InputPath, [string]$OutputPath, [int]$MaxW = 960, [int]$Q = 78)
  $img = [System.Drawing.Image]::FromFile($InputPath)
  try {
    $ratio = if ($img.Width -gt $MaxW) { $MaxW / $img.Width } else { 1 }
    $newW = [int][Math]::Round($img.Width * $ratio)
    $newH = [int][Math]::Round($img.Height * $ratio)
    $bmp = New-Object System.Drawing.Bitmap $newW, $newH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Q)
    $bmp.Save($OutputPath, $encoder, $encParams)
    $g.Dispose(); $bmp.Dispose()
    Write-Host "OK $(Split-Path $OutputPath -Leaf) ${newW}x${newH}"
  } finally { $img.Dispose() }
}

Compress-ImageFile -InputPath (Join-Path $dir "melioubi-latam-home.png") -OutputPath (Join-Path $dir "melioubi-latam-home.jpg")
Compress-ImageFile -InputPath (Join-Path $dir "melioubi-temp\media\alejandro-portada.jpeg") -OutputPath (Join-Path $dir "melioubi-latam-artist.jpg")
