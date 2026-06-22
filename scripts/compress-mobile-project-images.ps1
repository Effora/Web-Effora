Add-Type -AssemblyName System.Drawing

$dir = Join-Path $PSScriptRoot "..\assets\projects"
$files = @(
  "registro-sistema",
  "crm-seguimiento",
  "dashboard-tailwind",
  "oube-landing-new",
  "melioubi-latam-home",
  "nexova-formulario",
  "sistema-ia"
)

foreach ($name in $files) {
  $in = Join-Path $dir ($name + ".jpg")
  $out = Join-Path $dir ($name + "-sm.jpg")
  if (-not (Test-Path $in)) {
    Write-Warning "Missing: $in"
    continue
  }

  $img = [System.Drawing.Image]::FromFile($in)
  try {
    $maxW = 480
    $ratio = if ($img.Width -gt $maxW) { $maxW / $img.Width } else { 1 }
    $newW = [int][Math]::Round($img.Width * $ratio)
    $newH = [int][Math]::Round($img.Height * $ratio)
    $bmp = New-Object System.Drawing.Bitmap $newW, $newH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]72)
    $bmp.Save($out, $encoder, $encParams)
    $g.Dispose()
    $bmp.Dispose()
    $kb = [math]::Round((Get-Item $out).Length / 1KB)
    Write-Host "OK $name-sm.jpg ${newW}x${newH} ${kb}KB"
  }
  finally {
    $img.Dispose()
  }
}
