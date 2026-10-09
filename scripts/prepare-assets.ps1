# AXIOM — asset pipeline
# Derives web-optimised hero + detail plates from the supplied client renders.
# Source renders live outside the repo; run this once after dropping new renders
# into $SourceDir. Output is written to public/images and is committed.
#
#   pwsh -File scripts/prepare-assets.ps1
#
# Encoding: the supplied files are PNG renders; we re-encode to JPEG so the
# full-bleed hero assets stay in the low-hundreds of KB.

param(
  [string]$SourceDir = "c:\Users\parthh\Downloads",
  [string]$OutDir    = "$PSScriptRoot\..\public\images"
)

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = "Stop"

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

# JPEG quality via the built-in encoder.
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
function Get-EncoderParams([int]$Quality) {
  $p = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)
  return $p
}

function Export-Image {
  param(
    [string]$Source,   # file name inside $SourceDir
    [string]$Name,     # output file name (no extension)
    [int]$Width,       # target width; height follows aspect ratio
    [int]$Quality = 85
  )
  $src = Join-Path $SourceDir $Source
  if (-not (Test-Path $src)) { throw "missing source: $src" }

  $img = [System.Drawing.Image]::FromFile($src)
  try {
    # Never upscale. Two of the supplied renders (interiors 1120w, fabrication
    # 1060w) are already at or below the sizes this pipeline asks for, and
    # enlarging them only buys softness and wasted bytes. Clamping here means a
    # future request for a "1200w" interior plate degrades to the source rather
    # than silently inventing pixels nobody supplied.
    $target = [Math]::Min($Width, $img.Width)
    if ($target -lt $Width) {
      Write-Host ("  note: {0} clamped {1}w -> {2}w (source is smaller)" -f $Name, $Width, $target)
    }
    $h = [int][Math]::Round($img.Height * ($target / $img.Width))
    $bmp = New-Object System.Drawing.Bitmap($target, $h)
    try {
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      try {
        $g.InterpolationMode  = 'HighQualityBicubic'
        $g.PixelOffsetMode    = 'HighQuality'
        $g.SmoothingMode      = 'HighQuality'
        $g.DrawImage($img, 0, 0, $target, $h)
      } finally { $g.Dispose() }

      $dest = Join-Path $OutDir "$Name.jpg"
      $bmp.Save($dest, $jpegCodec, (Get-EncoderParams $Quality))
      $kb = [math]::Round((Get-Item $dest).Length / 1KB)
      Write-Host ("  {0,-34} {1}x{2}  {3} KB" -f "$Name.jpg", $target, $h, $kb)
    } finally { $bmp.Dispose() }
  } finally { $img.Dispose() }
}

Write-Host "Preparing AXIOM assets -> $OutDir"

# --- Chapter heroes (full-bleed background per chapter) ---------------------
# Landscape sources are 5K; we keep two stops for srcset. Portrait sources are
# already close to device pixel budgets, so they only need a light downscale.
Export-Image -Source 'architecture.webp.png' -Name 'chapter-architecture-2400' -Width 2400
Export-Image -Source 'architecture.webp.png' -Name 'chapter-architecture-1200' -Width 1200

Export-Image -Source 'parametric.webp.png'   -Name 'chapter-parametric-2400'   -Width 2400
Export-Image -Source 'parametric.webp.png'   -Name 'chapter-parametric-1200'   -Width 1200

Export-Image -Source 'interiors.webp.png'    -Name 'chapter-interiors-1120'    -Width 1120
Export-Image -Source 'interiors.webp.png'    -Name 'chapter-interiors-760'     -Width 760

Export-Image -Source 'fabrication.webp.png'  -Name 'chapter-fabrication-1060'  -Width 1060
Export-Image -Source 'fabrication.webp.png'  -Name 'chapter-fabrication-760'   -Width 760

# --- Chapter detail plates --------------------------------------------------
# Each chapter carries a second, quieter plate. Pairings are chosen so the two
# views of a chapter read as one project language (exterior / interior / detail).
Export-Image -Source 'project-residential.webp.png' -Name 'detail-architecture-1000' -Width 1000
Export-Image -Source 'project-glass.webp.png'       -Name 'detail-interiors-1000'    -Width 1000
Export-Image -Source 'architecture.webp.png'        -Name 'detail-parametric-1000'   -Width 1000
Export-Image -Source 'parametric.webp.png'          -Name 'detail-fabrication-1000'  -Width 1000

# --- Work grid plates --------------------------------------------------------
# The Work section is below the opening experience and lazy-loaded, so these are
# sized for a grid tile rather than a full-bleed hero: two stops per project so
# the browser can pick, and no plate wider than the tile that will hold it.
#
# The four 5K renders carry the visual weight, so they get the larger stop. The
# two soft sources (interiors 1120w, fabrication 1060w) are deliberately kept
# small — their tiles are also the narrower, portrait ones, and enlarging them
# would only manufacture softness the originals do not have. The clamp above
# enforces that if these numbers are ever raised.
Export-Image -Source 'architecture.webp.png' -Name 'work-architecture-1600' -Width 1600
Export-Image -Source 'architecture.webp.png' -Name 'work-architecture-900'  -Width 900

Export-Image -Source 'parametric.webp.png'   -Name 'work-parametric-1600'   -Width 1600
Export-Image -Source 'parametric.webp.png'   -Name 'work-parametric-900'    -Width 900

Export-Image -Source 'project-glass.webp.png' -Name 'work-glass-1400' -Width 1400
Export-Image -Source 'project-glass.webp.png' -Name 'work-glass-800'  -Width 800

Export-Image -Source 'project-residential.webp.png' -Name 'work-residential-1400' -Width 1400
Export-Image -Source 'project-residential.webp.png' -Name 'work-residential-800'  -Width 800

Export-Image -Source 'interiors.webp.png'   -Name 'work-interiors-900'  -Width 900
Export-Image -Source 'interiors.webp.png'   -Name 'work-interiors-560'  -Width 560

Export-Image -Source 'fabrication.webp.png' -Name 'work-fabrication-880' -Width 880
Export-Image -Source 'fabrication.webp.png' -Name 'work-fabrication-540' -Width 540

Write-Host "Done."
