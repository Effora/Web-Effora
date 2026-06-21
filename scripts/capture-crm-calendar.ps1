$ErrorActionPreference = "Stop"

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = Join-Path $PSScriptRoot "..\assets\projects"
$registroPublic = "C:\Users\mel_o\OneDrive\Desktop\Proyectos\Registro de operaciones Inmobiliarias\REGISTRO-DE-OPERACIONES\public"
$serverScript = Join-Path $PSScriptRoot "static-server.js"
$port = 3022

if (-not (Test-Path $chrome)) {
  Write-Warning "Chrome not found; skipping calendar capture."
  exit 0
}

$server = Start-Process node -ArgumentList "`"$serverScript`" `"$registroPublic`" $port" -PassThru -WindowStyle Hidden
Start-Sleep -Seconds 2

try {
  $outPng = Join-Path $outDir "crm-calendario.png"
  $url = "http://127.0.0.1:$port/index.html"

  $js = @"
(async () => {
  try { localStorage.setItem('roi_session', '{"token":"capture","user":{"role":"admin"}}'); } catch (e) {}
  location.reload();
})();
"@

  & $chrome `
    --headless=new `
    --disable-gpu `
    --hide-scrollbars `
    --window-size=1280,800 `
    --screenshot="$outPng" `
    --virtual-time-budget=8000 `
    "$url"

  Start-Sleep -Seconds 1

  $jsFile = Join-Path $env:TEMP "effora-capture-calendar.js"
  @"
(async function () {
  try { localStorage.setItem('roi_session', '{"token":"capture","user":{"role":"admin","permissions":{}}}'); } catch (e) {}
  document.getElementById('appView')?.classList.remove('hidden');
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById('calendarView')?.classList.remove('hidden');
  const btn = document.getElementById('googleCalendarSyncBtn');
  if (btn) btn.style.outline = '2px solid #f26b1f';
})();
"@ | Set-Content $jsFile -Encoding UTF8

  & $chrome `
    --headless=new `
    --disable-gpu `
    --hide-scrollbars `
    --window-size=1280,800 `
    --run-all-compositor-stages-before-draw `
    --screenshot="$outPng" `
    --virtual-time-budget=12000 `
    --js-flags="--expose-gc" `
    "$url"

  if (Test-Path $outPng) {
    Write-Host "Calendar capture saved: $outPng"
  } else {
    Write-Warning "Calendar capture failed."
  }
}
finally {
  if ($server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
  }
}
