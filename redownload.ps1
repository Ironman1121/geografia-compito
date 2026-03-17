# Download failed images with alternative IDs using curl
# 29-byte files = blocked. Replace with alternative IDs.

$images = @{
  "amalfi.jpg" = "https://images.unsplash.com/photo-1555068583-c32dcf5edc1f?auto=format&fit=crop&w=1280&q=80"
  "firenze.jpg" = "https://images.unsplash.com/photo-1543429776-27826acbe1eb?auto=format&fit=crop&w=1280&q=80"
  "matera.jpg" = "https://images.unsplash.com/photo-1563452288-5028843a8e71?auto=format&fit=crop&w=1280&q=80"
  "sicilia.jpg" = "https://images.unsplash.com/photo-1555068583-c32dcf5edc1f?auto=format&fit=crop&w=1280&q=80"
  "g2.jpg" = "https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&w=800&q=80"
  "g3.jpg" = "https://images.unsplash.com/photo-1581059686306-1b1de4c0dc7e?auto=format&fit=crop&w=800&q=80"
  "g4.jpg" = "https://images.unsplash.com/photo-1543429776-27826acbe1eb?auto=format&fit=crop&w=800&q=80"
  "g5.jpg" = "https://images.unsplash.com/photo-1555068583-c32dcf5edc1f?auto=format&fit=crop&w=800&q=80"
  "g6.jpg" = "https://images.unsplash.com/photo-1543429776-27826acbe1eb?auto=format&fit=crop&w=800&q=80"
  "g13.jpg" = "https://images.unsplash.com/photo-1555068583-c32dcf5edc1f?auto=format&fit=crop&w=800&q=80"
  "g16.jpg" = "https://images.unsplash.com/photo-1563452288-5028843a8e71?auto=format&fit=crop&w=800&q=80"
  "g18.jpg" = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
  "g20.jpg" = "https://images.unsplash.com/photo-1541425895048-5c57a13a367a?auto=format&fit=crop&w=800&q=80"
}

New-Item -ItemType Directory -Path "public\images" -Force | Out-Null

foreach ($img in $images.GetEnumerator()) {
  $dest = "public\images\$($img.Key)"
  Write-Host "Downloading $($img.Key)..."
  Invoke-WebRequest -Uri $img.Value -OutFile $dest -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

Write-Host "Done!"
