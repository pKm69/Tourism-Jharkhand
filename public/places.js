const jharkhandTouristPlaces = [
    // 1. Ranchi
    { district: "Ranchi", name: "Hundru Falls", lat: 23.3368, lon: 85.6708 , streetView: "https://www.google.com/maps/embed?pb=!4v1757713814586!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHEzSUNmSWc.!2m2!1d23.45092199211176!2d85.66745002193967!3f342.14!4f10.939999999999998!5f0.7820865974627469"},
    { district: "Ranchi", name: "Jagannath Mandir", lat: 23.3168, lon: 85.2815, streetView: "https://www.google.com/maps/embed?pb=!4v1757752279106!6m8!1m7!1sWoTX6LSyyZsogEHDm3Yamg!2m2!1d23.31708496753538!2d85.2815589520209!3f154.76!4f30.22!5f0.7820865974627469"},

    // 2. Dhanbad
    { district: "Dhanbad", name: "Geological Museum", lat: 23.8133, lon: 86.54107 , streetView: "https://www.google.com/maps/embed?pb=!4v1757752432014!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRGhnSXZPN3dF!2m2!1d23.81429529715651!2d86.44118070739347!3f1.3805821894299974!4f2.0435176838761606!5f0.4000000000000002"},
    { district: "Dhanbad", name: "Bhatinda Falls", lat: 23.8292, lon: 86.3725 , streetView: "https://www.google.com/maps/embed?pb=!4v1757752575849!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ001TkhDU2c.!2m2!1d23.71093106657359!2d86.33152416237512!3f346.9053852112525!4f1.9295472470669637!5f0.7820865974627469"},
  
    // 3. Bokaro
    { district: "Bokaro", name: "Jawaharlal Nehru Biological Park", lat: 23.6806, lon: 86.1533 , streetView: "https://www.google.com/maps/embed?pb=!4v1757752902945!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ3BxZFg3R1E.!2m2!1d23.68056215958948!2d86.15333307785602!3f25.74!4f11.909999999999997!5f0.41007199324273763"},
    { district: "Bokaro", name: "Tenughat Dam", lat: 23.7274, lon: 85.8377, streetView: "https://www.google.com/maps/embed?pb=!4v1757753097242!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0IxT0hOQmc.!2m2!1d23.72658265750509!2d85.83739799369016!3f275.97!4f7.930000000000007!5f0.7820865974627469"},
  
    // 4. Hazaribagh
    { district: "Hazaribagh", name: "Canary Hill", lat: 24.1142, lon: 85.3939 , streetView: "https://www.google.com/maps/embed?pb=!4v1757753268150!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2UtT2lrUUE.!2m2!1d24.01421799704866!2d85.3938316672839!3f285.3330292416826!4f0.3611541475414697!5f0.4000000000000002"},
    { district: "Hazaribagh", name: "Barso Pani Cave", lat: 23.8395, lon: 85.1823 , streetView: "https://www.google.com/maps/embed?pb=!4v1757753351293!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRG1nY09xTkE.!2m2!1d23.73934997016299!2d85.18248667601799!3f229.0718083171105!4f16.553565420820334!5f0.4000000000000002"},
  
    // 5. Giridih
    { district: "Giridih", name: "Parasnath Hill", lat: 24.0333, lon: 86.1667 , streetView: "https://www.google.com/maps/embed?pb=!4v1757753522224!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ19xLW5sdGdF!2m2!1d23.96133889385436!2d86.13655001488122!3f52.69982074617952!4f8.83897758306091!5f0.4000000000000002"},
    { district: "Giridih", name: "Usri Falls", lat: 24.2266, lon: 86.3064 , streetView: "https://www.google.com/maps/embed?pb=!4v1757768585590!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRGU1dGJKY3c.!2m2!1d24.09762036871997!2d86.36963762798806!3f126.12318327439498!4f-3.1521915494395927!5f0.4000000000000002"},
  
    // 6. Deoghar
    { district: "Deoghar", name: "Baidyanath Temple", lat: 24.4913, lon: 86.6990 , streetView: "https://www.google.com/maps/embed?pb=!4v1757754223598!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2g0dV9FV2c.!2m2!1d24.49259314266196!2d86.7002825890493!3f227.4834770224565!4f15.483188871167656!5f0.4000000000000002"},
    { district: "Deoghar", name: "Trikut Hill", lat: 24.4817, lon: 86.8510 , streetView: "https://www.google.com/maps/embed?pb=!4v1757754366714!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHE4OFdMUVE.!2m2!1d24.48337361145164!2d86.8484039072386!3f56.62!4f2.9200000000000017!5f0.4000000000000002"},
    
    // 7. Dumka
    { district: "Dumka", name: "Basukinath Mandir", lat: 24.3943, lon: 87.08686 , streetView: "https://www.google.com/maps/embed?pb=!4v1757754521459!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzk0Snp2NmdF!2m2!1d24.39444777857785!2d87.08686522775929!3f308.82792088853915!4f24.116477543381677!5f0.4000000000000002"},
    { district: "Dumka", name: "Massanjore Dam", lat: 24.10625, lon: 87.3083 , streetView: "https://www.google.com/maps/embed?pb=!4v1757754711444!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRGlqTHZrbUFF!2m2!1d24.10504830560199!2d87.30819002487469!3f324.93738411822454!4f9.745728160655702!5f0.4000000000000002"},
  
    // 8. Pakur
    { district: "Pakur", name: "Dharni Pahar", lat: 24.5796, lon: 87.7453, streetView: "https://www.google.com/maps/embed?pb=!4v1757758717672!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2lrOHoxWlE.!2m2!1d24.58538760285106!2d87.74380661207653!3f178.32!4f6.469999999999999!5f0.7820865974627469"},
  
    // 9. Sahibganj
    { district: "Sahibganj", name: "Moti Jharna Waterfall", lat: 24.8645, lon: 87.9031 , streetView: "https://www.google.com/maps/embed?pb=!4v1757758785407!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ3N1SjZ1bUFF!2m2!1d25.20661225729651!2d87.72630318491619!3f182.27!4f30.340000000000003!5f0.7820865974627469"},
    
    // 10. Godda
    { district: "Godda", name: "Damakol Waterfall", lat: 24.6759, lon: 87.4369 , streetView: "https://www.google.com/maps/embed?pb=!4v1757758858510!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ1Z1NmFwcGdF!2m2!1d24.57602001461916!2d87.43692611903656!3f120.92056404664665!4f19.22198827040677!5f0.4000000000000002"},
    { district: "Godda", name: "Harna Dam", lat: 24.8541, lon: 87.2407 , streetView: "https://www.google.com/maps/embed?pb=!4v1757759155810!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHEyOExlQ1E.!2m2!1d23.98458853926075!2d73.29876717188753!3f122.5897149627941!4f11.15566035828138!5f0.4000000000000002"},
  
    // 11. Jamtara
    { district: "Jamtara", name: "Miclai Ghat", lat: 24.0852, lon: 87.1563 , streetView: "https://www.google.com/maps/embed?pb=!4v1757759661578!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRE9uZVBnaHdF!2m2!1d23.88839653836259!2d86.91094749900421!3f300.39725413896844!4f3.7940932024210383!5f0.4000000000000002"},
  
    // 12. Chatra
    { district: "Chatra", name: "Tamasin Waterfall", lat: 24.3396, lon: 85.0987 , streetView: "https://www.google.com/maps/embed?pb=!4v1757760950343!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREt4dDZmeEFF!2m2!1d24.3400830990137!2d85.09869553868121!3f85.94884453620678!4f12.867032431622718!5f0.7820865974627469"},
  
    // 13. Palamu
    { district: "Palamu", name: "Palamu Fort", lat: 24.0028, lon: 84.0951 , streetView: "https://www.google.com/maps/embed?pb=!4v1757766016177!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRGtrdDI1Zmc.!2m2!1d23.8951108038425!2d84.23626813617864!3f131.61!4f28.689999999999998!5f0.4000000000000002"},
    { district: "Palamu", name: "Koel River Front", lat: 24.1342, lon: 84.0500, streetView: "https://www.google.com/maps/embed?pb=!4v1757767428741!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ2N6WXZ6eUFF!2m2!1d24.03429163275086!2d84.0622339710117!3f163.05!4f1.8199999999999932!5f0.4000000000000002"},
  
    // 14. Latehar
    { district: "Latehar", name: "Lodh Falls", lat: 23.7577, lon: 84.5065 , streetView: "https://www.google.com/maps/embed?pb=!4v1757767529037!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzZwOW01T2c.!2m2!1d23.48081393026832!2d84.0195669646794!3f48.999250672691595!4f22.942328777332705!5f0.4000000000000002"},
    { district: "Latehar", name: "Netarhat Hills", lat: 23.6750, lon: 84.2700 , streetView: "https://www.google.com/maps/embed?pb=!4v1757767642699!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ2EybzdScFFF!2m2!1d23.52213292619657!2d84.22081790888956!3f39.819609357827666!4f5.715877772081171!5f0.4000000000000002"},
    // 15. Gumla
    { district: "Gumla", name: "Navratangarh Fort", lat: 23.1098, lon: 84.6839, streetView: "https://www.google.com/maps/embed?pb=!4v1757768341155!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRGV5b0xZdUFF!2m2!1d23.10987397161884!2d84.78392603896012!3f241.89288744251604!4f14.705245997755839!5f0.4000000000000002"},
    { district: "Gumla", name: "Anjan Dham", lat: 23.1102, lon: 84.4528, streetView: "https://www.google.com/maps/embed?pb=!4v1757768418953!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHVoSS1yVEE.!2m2!1d23.13897329188572!2d84.45761327316958!3f227.10687534354824!4f3.1907487496386437!5f0.4000000000000002"},
  
    // 16. Simdega
    { district: "Simdega", name: "Kelaghagh Dam", lat: 22.6150, lon: 84.5039, streetView: "https://www.google.com/maps/embed?pb=!4v1757770266411!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRFNubzJOaXdF!2m2!1d22.59683758070803!2d84.52615089499292!3f288.3339595739176!4f7.171234242133849!5f0.4000000000000002"},
    { district: "Simdega", name: "Sankh River", lat: 22.4708, lon: 84.2913, streetView: "https://www.google.com/maps/embed?pb=!4v1757770794516!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRGh3YW42RHc.!2m2!1d22.47065587097354!2d84.29125918798059!3f89.76795286278505!4f-2.056455116419613!5f0.7820865974627469"},
  
    // 17. Lohardaga
    { district: "Lohardaga", name: "Lawapani waterfall", lat: 23.4973, lon: 84.5450, streetView: "https://www.google.com/maps/embed?pb=!4v1757771386251!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJREo5NVhzRlE.!2m2!1d23.59720000090923!2d84.54560002069658!3f263.35!4f5.900000000000006!5f0.4000000000000002" },
  
    // 18. Khunti
    { district: "Khunti", name: "Angrabari Temple", lat: 23.0775, lon: 85.2798, streetView: "https://www.google.com/maps/embed?pb=!4v1757771749122!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRG10OUxSYUE.!2m2!1d23.0308809051303!2d85.20012383616984!3f229.17841620977637!4f27.92798475025863!5f0.4000000000000002"},
    { district: "Khunti", name: "Panchghagh Falls", lat: 23.0135, lon: 85.1000, streetView: "https://www.google.com/maps/embed?pb=!4v1757771808673!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRG1ycC1iYXc.!2m2!1d22.94462166859777!2d85.25547920222259!3f242.07683392120362!4f1.8161903349386108!5f0.4000000000000002" },
  
    // 19. West Singhbhum
    { district: "Pashchimi Singhbhum", name: "Hirni Falls", lat: 22.7130, lon: 85.2812, streetView: "https://www.google.com/maps/embed?pb=!4v1757771931461!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2h1TFNqWWc.!2m2!1d22.80702707286218!2d85.36447647175711!3f9.393805265903175!4f11.31451624229149!5f0.4000000000000002" },
    { district: "Pashchimi Singhbhum", name: "Mahadebsal Temple", lat: 22.5122, lon: 85.3454, streetView: "https://www.google.com/maps/embed?pb=!4v1757771991006!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2V1WXI5TkE.!2m2!1d22.51217234278383!2d85.34554560947859!3f333.4776663670988!4f10.334310993531886!5f0.4000000000000002" },
  
    // 20. East Singhbhum
    { district: "Purbi Singhbhum", name: "Dimna Lake", lat: 22.8516, lon: 86.2626, streetView: "https://www.google.com/maps/embed?pb=!4v1757772255679!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ211NTZERHc.!2m2!1d22.86367180786655!2d86.26283831925092!3f149.91006373918324!4f-6.993059846401394!5f0.4000000000000002" },
    { district: "Purbi Singhbhum", name: "Jubilee Park", lat: 22.7128, lon: 86.1956, streetView: "https://www.google.com/maps/embed?pb=!4v1757772301053!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRE9fNVhTWGc.!2m2!1d22.81216515853568!2d86.19593713581001!3f9.605786569745936!4f7.142718089486905!5f0.4000000000000002" },
  
    // 21. Saraikela-kharsawan
    { district: "Saraikela-kharsawan", name: "Chandil Dam", lat: 22.9607, lon: 85.9970, streetView: "https://www.google.com/maps/embed?pb=!4v1757772301053!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRE9fNVhTWGc.!2m2!1d22.81216515853568!2d86.19593713581001!3f9.605786569745936!4f7.142718089486905!5f0.4000000000000002" },
  
    // 22. Koderma
    { district: "Kodarma", name: "Vrindaha Waterfalls", lat: 24.5072, lon: 85.5067, streetView: "https://www.google.com/maps/embed?pb=!4v1757772385087!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ1V1dG4weHdF!2m2!1d24.50722052283209!2d85.50661486184363!3f237.11222157232666!4f12.93574747300481!5f0.4000000000000002" },
  
    // 23. Ramgarh
    { district: "Ramgarh", name: "Patratu Valley", lat: 23.6854, lon: 85.2964, streetView: "https://www.google.com/maps/embed?pb=!4v1757772442751!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHFwYmlGVGc.!2m2!1d23.57492798778883!2d85.27355647199411!3f347.1684500141914!4f-4.750582191053866!5f0.4000000000000002" },
  
    // 24. Garhwa
    { district: "Garhwa", name: "Sukhaldari Falls", lat: 24.1480, lon: 83.6885, streetView: "https://www.google.com/maps/embed?pb=!4v1757772608633!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJREMyN0RHQXc.!2m2!1d24.08515251232813!2d83.4255865354589!3f80.10317538012053!4f2.5119603438450895!5f0.4000000000000002" },
    { district: "Garhwa", name: "Nagaruntari Temple", lat: 24.3032, lon: 83.4534, streetView: "https://www.google.com/maps/embed?pb=!4v1757772649244!6m8!1m7!1sTMO8B0wDE9RlKqy6LsTHlQ!2m2!1d24.27873047810114!2d83.493216156921!3f67.8182361028536!4f-1.5594752431491656!5f0.4000000000000002" },
  ];
  
  export default jharkhandTouristPlaces;
  