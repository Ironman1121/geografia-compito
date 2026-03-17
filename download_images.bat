@echo off
set "DIR=public\images"
if not exist %DIR% mkdir %DIR%

echo Downloading images...

curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1600" -o %DIR%\roma.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1600" -o %DIR%\firenze.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/584299/pexels-photo-584299.jpeg?auto=compress&cs=tinysrgb&w=1600" -o %DIR%\venezia.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/8141386/pexels-photo-8141386.jpeg?auto=compress&cs=tinysrgb&w=1600" -o %DIR%\milano.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/1036430/pexels-photo-1036430.jpeg?auto=compress&cs=tinysrgb&w=1600" -o %DIR%\amalfi.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/3354477/pexels-photo-3354477.jpeg?auto=compress&cs=tinysrgb&w=1600" -o %DIR%\matera.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/17698305/pexels-photo-17698305.jpeg?auto=compress&cs=tinysrgb&w=1600" -o %DIR%\sicilia.jpg

curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g1.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/2827116/pexels-photo-2827116.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g2.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g3.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g4.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/2676587/pexels-photo-2676587.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g5.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/3182452/pexels-photo-3182452.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g6.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/584299/pexels-photo-584299.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g7.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g8.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g9.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/8141386/pexels-photo-8141386.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g10.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/1010646/pexels-photo-1010646.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g11.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/2798835/pexels-photo-2798835.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g12.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/1036430/pexels-photo-1036430.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g13.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/3354477/pexels-photo-3354477.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g14.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/3562473/pexels-photo-3562473.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g15.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/3354477/pexels-photo-3354477.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g16.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/17698305/pexels-photo-17698305.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g17.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/1154502/pexels-photo-1154502.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g18.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/15312351/pexels-photo-15312351.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g19.jpg
curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/15312351/pexels-photo-15312351.jpeg?auto=compress&cs=tinysrgb&w=800" -o %DIR%\g20.jpg

echo Done!
