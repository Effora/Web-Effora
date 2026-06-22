Add-Type -AssemblyName System.Drawing
$dir = Join-Path $PSScriptRoot "..\assets\projects"
$in = Join-Path $dir "oube-sistema.png"
$out = Join-Path $dir "oube-sistema-new.jpg"
$img = [System.Drawing.Image]::FromFile($in)
try {
  $max = 960; $q = 78
  $ratio = if ($img.Width -gt $max) { $max / $img.Width } else { 1 }
  $w = [int][Math]::Round($img.Width * $ratio)
  $h = [int][Math]::Round($img.Height * $ratio)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)
  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$q)
  $bmp.Save($out, $encoder, $encParams)
  $g.Dispose(); $bmp.Dispose()
  Write-Host "OK oube-sistema-new.jpg ${w}x${h}"
} finally { $img.Dispose() }
