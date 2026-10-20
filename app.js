/* ---------- ISU 2026 data: C2-10 cash rents and 2021-2025 yields; A1-20 budgets ---------- */
const DIST={
 1:{n:'Northwest',lat:43.2,lon:-95.8,pasture:91},2:{n:'North Central',lat:43.1,lon:-93.6,pasture:101},3:{n:'Northeast',lat:43.0,lon:-91.6,pasture:133},
 4:{n:'West Central',lat:41.9,lon:-95.6,pasture:109},5:{n:'Central',lat:41.9,lon:-93.5,pasture:104},6:{n:'East Central',lat:41.8,lon:-91.1,pasture:98},
 7:{n:'Southwest',lat:41.0,lon:-95.1,pasture:103},8:{n:'South Central',lat:40.9,lon:-93.4,pasture:87},9:{n:'Southeast',lat:41.0,lon:-91.6,pasture:96}};
const RAW={
 1:[["Buena Vista","Cherokee","Clay","Dickinson","Emmet","Lyon","O'Brien","Osceola","Palo Alto","Plymouth","Pocahontas","Sioux"],[292,306,273,257,248,331,308,281,280,292,284,332],[209,212,199,190,204,206,214,209,200,195,212,215],[61,63,58,55,59,63,63,60,58,57,61,67]],
 2:[["Butler","Cerro Gordo","Floyd","Franklin","Hancock","Humboldt","Kossuth","Mitchell","Winnebago","Worth","Wright"],[297,265,235,288,267,274,280,273,289,250,275],[203,207,207,210,209,205,204,208,206,205,203],[59,61,58,61,62,59,61,60,61,58,60]],
 3:[["Allamakee","Winneshiek","Black Hawk","Bremer","Buchanan","Chickasaw","Clayton","Delaware","Dubuque","Fayette","Howard"],[274,274,301,305,274,310,269,325,321,253,276],[209,209,202,208,211,211,215,221,219,209,212],[59,59,59,62,61,59,62,64,66,60,58]],
 4:[["Audubon","Calhoun","Carroll","Crawford","Greene","Guthrie","Harrison","Ida","Monona","Sac","Shelby","Woodbury"],[288,276,293,304,275,255,284,317,319,291,293,315],[217,216,220,216,219,213,194,224,189,223,218,196],[62,63,63,62,63,61,56,64,55,64,61,56]],
 5:[["Boone","Dallas","Grundy","Hamilton","Hardin","Jasper","Marshall","Polk","Poweshiek","Story","Tama","Webster"],[285,290,300,282,288,282,289,267,291,281,313,282],[218,212,223,215,213,223,225,210,211,213,218,214],[65,62,67,62,64,65,66,62,62,63,63,62]],
 6:[["Benton","Cedar","Clinton","Iowa","Jackson","Johnson","Jones","Linn","Muscatine","Scott"],[292,274,282,279,258,273,268,279,261,271],[218,224,222,216,213,214,216,209,218,227],[63,67,65,61,65,62,63,60,65,70]],
 7:[["Adair","Adams","Cass","Fremont","Mills","Montgomery","Page","Pottawattamie","Taylor"],[225,246,255,246,269,260,242,282,227],[195,195,207,209,207,209,203,209,187],[58,57,59,61,58,60,59,59,58]],
 8:[["Appanoose","Clarke","Decatur","Ringgold","Lucas","Madison","Marion","Monroe","Union","Warren","Wayne"],[219,207,201,201,187,220,235,233,231,242,173],[172,173,174,174,167,194,203,174,189,190,179],[50,50,51,51,51,59,60,54,57,56,53]],
 9:[["Davis","Des Moines","Henry","Jefferson","Keokuk","Lee","Louisa","Mahaska","Wapello","Van Buren","Washington"],[200,272,283,255,244,286,259,243,243,214,294],[172,213,194,187,197,193,204,198,198,168,207],[53,66,63,57,61,61,63,61,61,53,63]]
};
const SHARED=new Set(["Allamakee","Winneshiek","Decatur","Ringgold","Mahaska","Wapello"]);
const COUNTIES=[];
for(const d in RAW){const [n,r,c,s]=RAW[d];n.forEach((nm,i)=>COUNTIES.push({name:nm,d:+d,rent:r[i],corn:c[i],soy:s[i],shared:SHARED.has(nm)}));}
const RMIN=Math.min(...COUNTIES.map(c=>c.rent)),RMAX=Math.max(...COUNTIES.map(c=>c.rent));

/* ---------- Solargis placeholders: district-level estimates until the GeoTIFF is connected ---------- */
/* Solargis / Global Solar Atlas PVOUT, long-term average kWh/kWp per year, sampled at each county's Census interior point */
const PVOUT={"Adair":1506.7,"Adams":1496.5,"Allamakee":1447.2,"Appanoose":1480.8,"Audubon":1514.4,"Benton":1480.8,"Black Hawk":1451.6,"Boone":1456.7,"Bremer":1476.4,"Buchanan":1469.5,"Buena Vista":1487.4,"Butler":1477.5,"Calhoun":1479.7,"Carroll":1501.6,"Cass":1511.1,"Cedar":1482.6,"Cerro Gordo":1463.7,"Cherokee":1496.5,"Chickasaw":1472.8,"Clarke":1490.7,"Clay":1496.1,"Clayton":1460.4,"Clinton":1477.5,"Crawford":1502.7,"Dallas":1449.4,"Davis":1476.8,"Decatur":1487.4,"Delaware":1472.4,"Des Moines":1449.1,"Dickinson":1485.2,"Dubuque":1462.6,"Emmet":1479.7,"Fayette":1468.0,"Floyd":1467.7,"Franklin":1480.8,"Fremont":1515.8,"Greene":1478.3,"Grundy":1483.4,"Guthrie":1497.2,"Hamilton":1465.1,"Hancock":1465.8,"Hardin":1479.3,"Harrison":1506.4,"Henry":1471.0,"Howard":1473.9,"Humboldt":1466.6,"Ida":1510.0,"Iowa":1484.1,"Jackson":1456.4,"Jasper":1475.3,"Jefferson":1466.2,"Johnson":1458.2,"Jones":1475.3,"Keokuk":1471.0,"Kossuth":1469.1,"Lee":1458.2,"Linn":1469.1,"Louisa":1458.9,"Lucas":1480.4,"Lyon":1507.5,"Madison":1480.8,"Mahaska":1477.2,"Marion":1476.4,"Marshall":1481.2,"Mills":1519.5,"Mitchell":1467.3,"Monona":1465.5,"Monroe":1469.1,"Montgomery":1516.2,"Muscatine":1450.9,"O'Brien":1504.9,"Osceola":1507.5,"Page":1516.2,"Palo Alto":1479.0,"Plymouth":1504.2,"Pocahontas":1482.3,"Polk":1473.9,"Pottawattamie":1525.3,"Poweshiek":1491.4,"Ringgold":1499.4,"Sac":1503.4,"Scott":1466.9,"Shelby":1516.6,"Sioux":1499.1,"Story":1465.5,"Tama":1488.8,"Taylor":1508.5,"Union":1489.2,"Van Buren":1467.3,"Wapello":1464.0,"Warren":1473.9,"Washington":1473.1,"Wayne":1489.6,"Webster":1459.6,"Winnebago":1473.1,"Winneshiek":1451.2,"Woodbury":1516.6,"Worth":1464.0,"Wright":1470.2};
const pvoutOf=c=>PVOUT[c.name];
const optaOf=c=>Math.round(0.76*DIST[c.d].lat+3.2);

/* ---------- Crops and systems ---------- */
const SYSTEMS={
 row:{name:'Row-crop agrivoltaics',sub:'Wide lanes for tractors and combines',crops:['corn','soy']},
 graze:{name:'Solar grazing',sub:'Sheep pasture or hay between and under rows',crops:['sheep','hay']},
 hort:{name:'Horticulture and specialty crops',sub:'Berries and leafy greens in partial shade',crops:['berry','greens']}};
const PH='Placeholder, replace with your own budget';
const CROPS={
 corn:{name:'Corn',yU:'bu/ac',pU:'$/bu',yF:c=>c.corn,price:4.20,cost:483.60,sat:1.0,minLow:3.0,machW:9,machH:3.2,canopy:2.8,machN:'12-row planter and combine',
  sY:'ISU 2026, county 5-year average',sP:'Example price from your brief',sC:'ISU 2026 budget, corn after soybeans, variable costs',
  note:'Corn needs the most light and the widest lanes for planters and combines, so expect the widest row spacing.'},
 soy:{name:'Soybeans',yU:'bu/ac',pU:'$/bu',yF:c=>c.soy,price:10.40,cost:290.21,sat:0.80,minLow:1.5,machW:9,machH:3.2,canopy:1.0,machN:'planter and combine',
  sY:'ISU 2026, county 5-year average',sP:'Placeholder price, replace with current bids',sC:'ISU 2026 budget, soybeans after corn, variable costs',
  note:'Soybeans tolerate partial shade better than corn, so the generator can pack rows closer.'},
 sheep:{name:'Sheep grazing',yU:'season',pU:'$/ac',yF:()=>1,priceF:c=>DIST[c.d].pasture,cost:45.30,sat:0.55,minLow:1.0,machW:3,machH:1.1,canopy:0.4,machN:'mower',
  sY:'One grazing season per acre',sP:'ISU 2026 district rent, high-productivity pasture',sC:'ISU 2026 budget, maintaining grass-legume pasture, variable costs',
  note:'Sheep graze up to the posts, so lanes can be narrow. Grazing income here is the ISU pasture rental value, which is modest. The lease does most of the work.'},
 hay:{name:'Alfalfa hay',yU:'tons/ac',pU:'$/ton',yF:()=>4,price:170,cost:242.56,sat:0.65,minLow:1.2,machW:6,machH:3.0,canopy:0.9,machN:'mower and baler',
  sY:'ISU 2026 budget, 4-ton scenario',sP:'Placeholder price, ISU reports cost not price',sC:'ISU 2026 budget, 4 tons, large round bales, variable costs',
  note:'Alfalfa and grass hay handle shade well. Hay price is a placeholder because ISU publishes production cost, not market price.'},
 berry:{name:'Berries (strawberries)',yU:'lb/ac',pU:'$/lb',yF:()=>8000,price:2.75,cost:15000,sat:0.60,minLow:1.0,machW:2.5,machH:2.4,canopy:0.4,machN:'small tractor',
  sY:PH,sP:PH,sC:PH,note:'Berries do well with some afternoon shade. Yield, price and cost are placeholders. ISU does not publish a berry budget in these files, so use a budget from your own farm or from Extension horticulture.'},
 greens:{name:'Leafy greens',yU:'lb/ac',pU:'$/lb',yF:()=>8000,price:2.20,cost:11500,sat:0.45,minLow:1.0,machW:2.5,machH:2.4,canopy:0.4,machN:'small tractor',
  sY:PH,sP:PH,sC:PH,note:'Lettuce, kale and spinach are the most shade-tolerant crops here. Yield, price and cost are placeholders for you to replace.'}
};

/* ---------- State ---------- */
const S={county:COUNTIES.find(c=>c.name==='Story'),system:'row',crop:'corn',target:80,lease:1000,acres:100,h:3.5,th:30,P:20,mode:'auto',ov:{},diff:0.40,share:0.75};
const $=id=>document.getElementById(id);
const W=4.6,KW_M2=0.21,LAND_F=0.85,ACRE=4046.86;
const money=v=>(v<0?'−':'')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const num=(v,d=0)=>Number(v).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const cr=()=>CROPS[S.crop];
function val(k){const o=S.ov[S.crop]||{};if(k in o)return o[k];const c=cr();
 if(k==='yield')return c.yF(S.county);if(k==='price')return c.priceF?c.priceF(S.county):c.price;if(k==='cost')return c.cost;if(k==='sat')return c.sat;}

/* ---------- Light model ---------- */
const sunCache=new Map();
function sunSamples(lat){
 if(sunCache.has(lat))return sunCache.get(lat);
 const out=[],phi=lat*Math.PI/180;
 for(const n of [121,152,182,213,244]){
  const dec=23.45*Math.sin(2*Math.PI*(284+n)/365)*Math.PI/180;
  for(let hd=-90;hd<=90;hd+=15){
   const H=hd*Math.PI/180;
   const up=Math.sin(phi)*Math.sin(dec)+Math.cos(phi)*Math.cos(dec)*Math.cos(H);
   if(up<Math.sin(8*Math.PI/180))continue;
   const north=Math.sin(dec)*Math.cos(phi)-Math.cos(dec)*Math.sin(phi)*Math.cos(H);
   const len=Math.hypot(north,up);
   out.push({dx:north/len,dz:up/len,w:up});
  }}
 sunCache.set(lat,out);return out;
}
const NA=18,DIFFDIR=[];for(let k=0;k<NA;k++){const a=(k+.5)*Math.PI/NA;DIFFDIR.push([Math.cos(a),Math.sin(a)]);}
/* Cross-section of south-facing rows running east-west. x runs north, z up. Ground light as a fraction of open field. */
function groundProfile(h,th,P,Ng,sun,diff){
 const wc=W*Math.cos(th),wz=W*Math.sin(th),NP=7;
 const blocked=(x0,dx,dz)=>{
  for(let i=-NP;i<=NP;i++){
   const rx=i*P-x0,den=dx*wz-dz*wc;
   if(Math.abs(den)<1e-9)continue;
   const t=(rx*wz-h*wc)/den,s=(rx*dz-h*dx)/den;
   if(t>0&&s>=0&&s<=1)return true;
  }
  return false;};
 let sw=0;for(const s of sun)sw+=s.w;
 const prof=new Float64Array(Ng);
 for(let g=0;g<Ng;g++){
  const x0=(g+.5)/Ng*P;let beam=0;
  for(const s of sun)if(!blocked(x0,s.dx,s.dz))beam+=s.w;
  beam/=sw;
  let dv=0,dw=0;for(const [dx,dz] of DIFFDIR){dw+=dz;if(!blocked(x0,dx,dz))dv+=dz;}
  prof[g]=(1-diff)*beam+diff*dv/dw;
 }
 return prof;
}
const meanOf=a=>{let s=0;for(const v of a)s+=v;return s/a.length;};
const kwpAc=P=>ACRE*(W/P)*KW_M2*LAND_F;
const alleyOf=(th,P)=>P-W*Math.cos(th);
function search(){
 const c=cr(),sun=sunSamples(DIST[S.county.d].lat),sat=val('sat'),target=S.target/100,opta=optaOf(S.county);
 const hs=[];for(let h=c.minLow;h<=5.001;h+=0.5)hs.push(+h.toFixed(2));
 const ths=[10,15,20,25,30,35,40];if(!ths.includes(opta)&&opta>=10&&opta<=40)ths.push(opta);
 let best=null,fall=null,tested=0;
 for(const h of hs)for(const tdeg of ths){
  const th=tdeg*Math.PI/180;if(h+W*Math.sin(th)>7.5)continue;
  const pmin=Math.ceil((W*Math.cos(th)+c.machW+1)*2)/2;
  for(let P=pmin;P<=40;P+=1){
   tested++;
   const f=meanOf(groundProfile(h,th,P,8,sun,S.diff)),R=Math.min(1,f/sat),kw=kwpAc(P)*(1-0.00025*Math.pow(tdeg-opta,2));
   const cand={h,th:tdeg,P,f,R,kw};
   if(R>=target){
    if(!best||kw>best.kw+1e-6||(Math.abs(kw-best.kw)<1e-6&&(h<best.h||(h===best.h&&Math.abs(tdeg-opta)<Math.abs(best.th-opta)))))best=cand;
   }
   if(!fall||R>fall.R+1e-6||(Math.abs(R-fall.R)<1e-6&&kw>fall.kw))fall=cand;
  }}
 return {pick:best||fall,met:!!best,tested};
}
function evaluate(){
 const c=cr(),th=S.th*Math.PI/180,sun=sunSamples(DIST[S.county.d].lat),sat=val('sat');
 const Ng=48,prof=groundProfile(S.h,th,S.P,Ng,sun,S.diff),f=meanOf(prof);
 const R=Math.min(1,f/sat),kw=kwpAc(S.P),opta=optaOf(S.county),pv=pvoutOf(S.county);
 const tf=1-0.00025*Math.pow(S.th-opta,2);
 return {prof,Ng,f,R,kw,mwh:kw*pv*tf/1000,alley:alleyOf(th,S.P),wc:W*Math.cos(th),wz:W*Math.sin(th),min:Math.min(...prof)};
}
let M=null;

/* ---------- Colors ---------- */
const STOPS=[[0,[20,61,43]],[.5,[76,154,94]],[1,[212,235,168]]];
function ramp(v){v=Math.max(0,Math.min(1,v));for(let i=1;i<STOPS.length;i++){if(v<=STOPS[i][0]){const [a,ca]=STOPS[i-1],[b,cb]=STOPS[i],t=(v-a)/(b-a);return ca.map((x,k)=>Math.round(x+(cb[k]-x)*t));}}return STOPS[2][1];}
const rampCss=v=>'rgb('+ramp(v).join(',')+')';
const cssVar=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ---------- UI: county tiles and benchmark ---------- */
function buildTiles(){
 const host=$('districts');host.innerHTML='';
 for(let d=1;d<=9;d++){
  const box=document.createElement('div');box.className='dist';
  box.innerHTML='<div class="dist-t">'+DIST[d].n+'</div><div class="tiles"></div>';
  const tiles=box.querySelector('.tiles');
  COUNTIES.filter(c=>c.d===d).sort((a,b)=>a.name.localeCompare(b.name)).forEach(c=>{
   const b=document.createElement('button');b.type='button';b.className='tile';b.dataset.name=c.name;
   const p=10+(c.rent-RMIN)/(RMAX-RMIN)*45;
   b.style.setProperty('--p',`calc(${p.toFixed(1)}% * var(--k,1))`);
   b.style.setProperty('--k','1');
   b.style.background=`color-mix(in srgb,var(--crop) calc(${(p/56).toFixed(3)} * var(--tile-max)),var(--surface))`;
   b.innerHTML=c.name+(c.shared?'†':'')+'<b>$'+c.rent+'</b>';if(c.name.length>8)b.classList.add('long');
   b.title=c.name+' County: $'+c.rent+' per acre average cash rent';
   b.setAttribute('aria-pressed',c===S.county);
   b.addEventListener('click',()=>setCounty(c));
   tiles.appendChild(b);
  });
  host.appendChild(box);
 }
}
function markTiles(){document.querySelectorAll('.tile').forEach(t=>t.setAttribute('aria-pressed',t.dataset.name===S.county.name));}
function renderBench(){
 const c=S.county,D=DIST[c.d];
 $('bench').innerHTML=
 `<div class="src"><h3>${c.name} County · ISU Extension <span class="badge ok">2026 data</span></h3>
  <div class="kv"><span>Average cash rent</span><b>${money(c.rent)}/ac</b></div>
  <div class="kv"><span>Corn yield, 5-year avg</span><b>${c.corn} bu/ac</b></div>
  <div class="kv"><span>Soybean yield, 5-year avg</span><b>${c.soy} bu/ac</b></div>
  <div class="kv"><span>${D.n} pasture rent</span><b>${money(D.pasture)}/ac</b></div>
  <div class="kv"><span>Budget costs: corn, soybeans</span><b>$484, $290/ac</b></div></div>
  <div class="src"><h3>Sunlight at ${c.name} County's center <span class="badge ok">Measured</span></h3>
  <div class="kv"><span>Sun power: electricity a year per kW of panels</span><b>${num(pvoutOf(c),0)} kWh</b></div>
  <div class="kv"><span>Best panel angle, estimate</span><b>${optaOf(c)}°</b></div>
  <div class="kv"><span>Hazy-sky light, estimate</span><b>${Math.round(S.diff*100)}%</b></div>
  <p class="small">Sun power is the long-term average for a typical fixed-tilt panel at the county's center point. Hazy-sky light is the share of sunlight that arrives scattered by clouds and haze, which still reaches crops under panels. The best angle and the hazy-sky share are estimates.</p></div>`;
}
/* ---------- UI: system and crop ---------- */
function renderSystems(){
 $('systems').innerHTML='';
 for(const k in SYSTEMS){const b=document.createElement('button');b.type='button';b.className='opt';b.setAttribute('aria-pressed',k===S.system);
  b.innerHTML='<b>'+SYSTEMS[k].name+'</b><span>'+SYSTEMS[k].sub+'</span>';
  b.addEventListener('click',()=>{S.system=k;S.crop=SYSTEMS[k].crops[0];renderSystems();renderCrops();onCropChange();});$('systems').appendChild(b);}
}
function renderCrops(){
 $('crops').innerHTML='';
 SYSTEMS[S.system].crops.forEach(k=>{const b=document.createElement('button');b.type='button';b.className='pill';b.textContent=CROPS[k].name;b.setAttribute('aria-pressed',k===S.crop);
  b.addEventListener('click',()=>{S.crop=k;renderCrops();onCropChange();});$('crops').appendChild(b);});
 $('cropnote').textContent=cr().note;
}
function onCropChange(){$('cropnote').textContent=cr().note;buildAssump();runAuto();}
function setCounty(c){S.county=c;for(const k in S.ov)delete S.ov[k].yield,delete S.ov[k].price;markTiles();renderBench();buildAssump();runAuto();}

/* ---------- Layout checks and metrics ---------- */
function renderMetrics(){
 const c=cr();
 $('metrics').innerHTML=
  `<div class="m"><span class="v">${num(M.f*100)}%</span><span class="l">Average ground light</span></div>
   <div class="m"><span class="v">${num(M.R*100)}%</span><span class="l">Crop yield kept</span></div>
   <div class="m"><span class="v">${num(M.kw)}</span><span class="l">kW of panels per acre</span></div>
   <div class="m"><span class="v">${num(M.mwh,0)}</span><span class="l">Electricity made per acre, MWh a year</span></div>`;
 const need=c.machW+1,lane=M.alley>=need,can=S.h>=c.minLow,under=S.h>=c.machH,hit=M.R>=S.target/100-1e-9;
 const row=(cls,tag,txt)=>`<div class="check ${cls}"><i>${tag}</i><span>${txt}</span></div>`;
 $('checks').innerHTML=
  row(lane?'pass':'fail',lane?'PASS':'FAIL',`Machinery lane: ${num(M.alley,1)} m clear between panel edges. The ${c.machN} (${c.machW} m wide) needs ${num(need,1)} m with a 1 m margin.`)+
  row(can?'pass':'fail',can?'PASS':'FAIL',`Crop clearance: low edge at ${num(S.h,1)} m. ${c.name} needs at least ${num(c.minLow,1)} m.`)+
  row(hit?'pass':'fail',hit?'PASS':'FAIL',`Yield target: ${num(M.R*100)}% kept against your ${S.target}% goal.`)+
  row('info','INFO',under?`Equipment can also drive under the low edge (${c.machH} m tall).`:`Equipment stays in the lanes. The low edge is below the ${c.machH} m machine height.`);
}
/* ---------- Side view ---------- */
function drawSection(){
 const c=cr(),{h,P}=S,th=S.th*Math.PI/180,wc=M.wc,wz=M.wz,span=3*P;
 const top=Math.max(h+wz,c.machH,c.canopy,3.6)+2.4,VW=720,pad=44;
 const sc=Math.min((VW-2*pad)/span,300/(top+1.4)),VH=Math.round((top+1.4)*sc+14);
 const x0=(VW-span*sc)/2,X=x=>x0+x*sc,Y=z=>8+(top-z)*sc;
 let s=`<svg viewBox="0 0 ${VW} ${VH}" role="img" aria-label="Side view of three panel rows with a tractor in the lane">`;
 const strip=Math.max(7,0.45*sc);
 for(let i=0;i<3;i++)for(let g=0;g<M.Ng;g++)
  s+=`<rect x="${X(i*P+g*P/M.Ng).toFixed(1)}" y="${Y(0).toFixed(1)}" width="${(P/M.Ng*sc+0.6).toFixed(1)}" height="${strip.toFixed(1)}" fill="${rampCss(M.prof[g])}"/>`;
 s+=`<line x1="${X(0)}" x2="${X(span)}" y1="${Y(0)}" y2="${Y(0)}" stroke="${cssVar('--ink2')}" stroke-width="1"/>`;
 s+=`<line x1="${X(0)}" x2="${X(span)}" y1="${Y(c.canopy)}" y2="${Y(c.canopy)}" stroke="${cssVar('--crop')}" stroke-dasharray="4 4" stroke-width="1.2"/><text class="xt" x="${X(span)-2}" y="${Y(c.canopy)-4}" text-anchor="end" style="fill:${cssVar('--crop')}">crop canopy ${c.canopy} m</text>`;
 const pw=Math.max(3,0.14*sc);
 for(let i=0;i<3;i++){
  const ax=i*P,mx=ax+wc/2,mz=h+wz/2;
  s+=`<line x1="${X(mx)}" y1="${Y(mz)}" x2="${X(mx)}" y2="${Y(0)}" stroke="${cssVar('--ink3')}" stroke-width="2"/>`;
  s+=`<line x1="${X(ax)}" y1="${Y(h)}" x2="${X(ax+wc)}" y2="${Y(h+wz)}" stroke="${cssVar('--solar')}" stroke-width="${pw}" stroke-linecap="round"/>`;
 }
 const lane=M.alley>=c.machW+1,cx=(wc+P)/2;
 const tc=lane?cssVar('--ok'):cssVar('--bad');
 s+=`<rect x="${X(cx-c.machW/2)}" y="${Y(c.machH)}" width="${c.machW*sc}" height="${c.machH*sc}" fill="none" stroke="${tc}" stroke-width="1.6" stroke-dasharray="5 3"/>`;
 s+=`<text class="xt" x="${X(cx)}" y="${Y(c.machH)-5}" text-anchor="middle" style="fill:${tc}">${c.machN} ${c.machW} × ${c.machH} m</text>`;
 const dy=Y(top-0.9);
 s+=`<line x1="${X(0)}" x2="${X(P)}" y1="${dy}" y2="${dy}" stroke="${cssVar('--ink2')}"/><line x1="${X(0)}" x2="${X(0)}" y1="${dy-4}" y2="${dy+4}" stroke="${cssVar('--ink2')}"/><line x1="${X(P)}" x2="${X(P)}" y1="${dy-4}" y2="${dy+4}" stroke="${cssVar('--ink2')}"/>`;
 s+=`<text class="xt" x="${X(P/2)}" y="${dy-5}" text-anchor="middle">row spacing ${num(P,1)} m</text>`;
 s+=`<line x1="${X(0)-7}" x2="${X(0)-7}" y1="${Y(0)}" y2="${Y(h)}" stroke="${cssVar('--ink2')}"/><text class="xt" x="${Math.max(2,X(0)-11)}" y="${(Y(0)+Y(h))/2}" text-anchor="end">${num(h,1)} m</text>`;
 s+=`<text class="xt" x="${X(wc/2)}" y="${Y(h+wz)-8}" text-anchor="middle">tilt ${S.th}°</text>`;
 s+=`<text class="xt" x="${X(0)}" y="${VH-1}">S</text><text class="xt" x="${X(span)}" y="${VH-1}" text-anchor="end">N</text></svg>`;
 $('xsec').innerHTML=s;
}
/* ---------- Heatmap ---------- */
function drawHeat(){
 if(!M)return;const cv=$('heat'),ctx=cv.getContext('2d'),Wd=cv.width,Hd=cv.height,P=S.P,span=3*P,sc=Hd/span;
 for(let y=0;y<Hd;y++){
  const xn=(Hd-1-y)/sc,m=((xn%P)+P)%P,g=Math.min(M.Ng-1,Math.floor(m/P*M.Ng));
  ctx.fillStyle=rampCss(M.prof[g]);ctx.fillRect(0,y,Wd,1);
 }
 const sol=cssVar('--solar'),ink=cssVar('--ink');
 for(let i=0;i<3;i++){
  const y1=Hd-(i*P+M.wc)*sc,y2=Hd-i*P*sc;
  ctx.fillStyle=sol;ctx.globalAlpha=.9;ctx.fillRect(0,y1,Wd,y2-y1);ctx.globalAlpha=1;
  ctx.strokeStyle=ink;ctx.lineWidth=1;ctx.strokeRect(.5,y1,Wd-1,y2-y1);
  ctx.strokeStyle='rgba(255,255,255,.35)';
  for(let x=1.1*sc;x<Wd;x+=1.1*sc){ctx.beginPath();ctx.moveTo(x,y1);ctx.lineTo(x,y2);ctx.stroke();}
 }
 ctx.fillStyle='#fff';ctx.font='500 13px IBM Plex Mono, monospace';ctx.fillText('N ↑',8,18);
 const bar=10*sc;ctx.fillRect(Wd-bar-10,Hd-16,bar,3);ctx.fillText('10 m',Wd-bar-10,Hd-22);
 $('heatNote').textContent=`Blue bands are panel rows. Between them, light ranges from ${num(M.min*100)}% to ${num(Math.max(...M.prof)*100)}% of open field, averaged over May to September.`;
}
function tableView(){
 let r='<tr><th>Distance north of panel low edge</th><th>Light reaching the ground</th></tr>';
 for(let k=0;k<8;k++){const g=Math.floor(k*M.Ng/8),x=(g+.5)/M.Ng*S.P;r+=`<tr><td>${num(x,1)} m${x<M.wc?' (under panel)':''}</td><td>${num(M.prof[g]*100)}%</td></tr>`;}
 $('ptable').innerHTML=r;
}
$('heat').addEventListener('mousemove',e=>{
 if(!M)return;const cv=e.currentTarget,r=cv.getBoundingClientRect(),y=(e.clientY-r.top)/r.height*cv.height,sc=cv.height/(3*S.P);
 const xn=(cv.height-y)/sc,m=((xn%S.P)+S.P)%S.P,g=Math.min(M.Ng-1,Math.floor(m/S.P*M.Ng)),t=$('tip');
 t.textContent=m<M.wc?'Panel row':num(M.prof[g]*100)+'% of open-field light';t.style.display='block';t.style.left=(e.clientX+12)+'px';t.style.top=(e.clientY+12)+'px';});
$('heat').addEventListener('mouseleave',()=>{$('tip').style.display='none';});

/* ---------- Ledger ---------- */
function renderLedger(){
 const Y=val('yield'),Pr=val('price'),C=val('cost'),R=M.R;
 const farm=Y*Pr-C,solar=S.lease,cost2=C*(1-S.share*(1-R)),dual=S.lease+Y*R*Pr-cost2;
 $('ledTitle').textContent=S.county.name+' County, '+cr().name.toLowerCase();
 $('nFarm').textContent=money(farm);$('nSolar').textContent=money(solar);$('nDual').textContent=money(dual);
 const mx=Math.max(Math.abs(farm),Math.abs(solar),Math.abs(dual),1);
 $('bFarm').style.width=Math.max(1,Math.abs(farm)/mx*100)+'%';$('bSolar').style.width=Math.max(1,Math.abs(solar)/mx*100)+'%';$('bDual').style.width=Math.max(1,Math.abs(dual)/mx*100)+'%';
 $('leaseMult').textContent=`${num(solar/S.county.rent,1)} times the county's ${money(S.county.rent)} cash rent`;
 const d=dual-farm,dd=$('dDual');dd.className='delta '+(d>=0?'up':'down');
 dd.textContent=(d>=0?'+':'−')+money(Math.abs(d)).replace('−','')+' per acre compared with farming alone';
 const u=cr().yU==='season'?'':' '+cr().yU.replace('/ac','');
 $('formula').innerHTML=`${money(S.lease)} lease + (${num(Y,Y%1?1:0)}${u} × ${num(R*100)}% × ${cr().pU==='$/ac'?money(Pr):'$'+num(Pr,2)}) − ${money(cost2)} inputs = ${money(dual)}<br>Farm only: ${num(Y,Y%1?1:0)}${u} × ${cr().pU==='$/ac'?money(Pr):'$'+num(Pr,2)} − ${money(C)} inputs = ${money(farm)}`;
 $('totals').textContent=`For ${S.acres} acres: ${money(farm*S.acres)} a year farming alone, ${money(dual*S.acres)} with solar and crop. The array makes about ${num(M.mwh*S.acres,0)} MWh a year.`;
 $('leaseV').textContent=money(S.lease);$('acresV').textContent=S.acres;
}
/* ---------- Inputs table ---------- */
function buildAssump(){
 const c=cr(),f=(id,v,st)=>`<input id="${id}" type="number" step="${st}" value="${v}">`;
 $('assump').innerHTML=`<tr><th>Input</th><th>Value</th><th>Source</th></tr>
 <tr><td>Yield, ${c.yU}</td><td>${f('aY',val('yield'),'any')}</td><td>${c.sY}</td></tr>
 <tr><td>Price, ${c.pU}</td><td>${f('aP',+val('price').toFixed(2),'any')}</td><td>${c.sP}</td></tr>
 <tr><td>Input costs, $/ac</td><td>${f('aC',val('cost'),'any')}</td><td>${c.sC}</td></tr>
 <tr><td>Light needed for full yield, % of open field</td><td>${f('aS',Math.round(val('sat')*100),1)}</td><td>Placeholder light response, calibrate with trial data</td></tr>
 <tr><td>Hazy-sky share of light, %</td><td>${f('aD',Math.round(S.diff*100),1)}</td><td>Estimate. The free sunlight data does not include it</td></tr>
 <tr><td>Input savings on lost yield, %</td><td>${f('aH',Math.round(S.share*100),1)}</td><td>Set to match your Story County example ($484 to about $411)</td></tr>
 <tr><td>Panel width 4.6 m, 21% modules, 85% land use</td><td colspan="2">Fixed assumptions behind the kW of panels per acre figure</td></tr>`;
 const bind=(id,fn,again)=>$(id).addEventListener('input',e=>{const v=parseFloat(e.target.value);if(!isFinite(v))return;fn(v);again?runAuto():render();});
 const ov=()=>(S.ov[S.crop]=S.ov[S.crop]||{});
 bind('aY',v=>ov().yield=v);bind('aP',v=>ov().price=v);bind('aC',v=>ov().cost=v);
 bind('aS',v=>ov().sat=Math.max(.2,v/100),true);bind('aD',v=>{S.diff=Math.min(.9,Math.max(.05,v/100));renderBench();},true);bind('aH',v=>S.share=Math.min(1,Math.max(0,v/100)));
}
/* ---------- Orchestration ---------- */
function syncSliders(){
 $('target').value=S.target;$('hSl').value=S.h;$('tSl').value=S.th;$('pSl').value=S.P;
 $('targetV').textContent=S.target+'%';$('hV').textContent=num(S.h,1)+' m';$('tV').textContent=S.th+'°';$('pV').textContent=num(S.P,1)+' m';
 $('lease').value=S.lease;$('acres').value=S.acres;
}
function render(){M=evaluate();syncSliders();renderMetrics();drawSection();drawHeat();tableView();renderLedger();}
function runAuto(){
 const t0=performance.now(),r=search();
 S.h=r.pick.h;S.th=r.pick.th;S.P=r.pick.P;S.mode='auto';
 /* the search uses a coarse ground grid; widen spacing until the fine grid also meets the target */
 if(r.met){let g=0;while(g++<60&&S.P<40&&evaluate().R<S.target/100-1e-9)S.P+=0.5;}
 render();
 $('genNote').textContent=(r.met?'':`No layout reaches ${S.target}%, showing the closest. `)+`Tested ${r.tested.toLocaleString('en-US')} layouts in ${Math.round(performance.now()-t0)} ms.`;
}
function manual(){S.mode='manual';$('genNote').textContent='Custom layout. Press Generate to return to the best fit.';render();}
$('target').addEventListener('input',e=>{S.target=+e.target.value;runAuto();});
$('hSl').addEventListener('input',e=>{S.h=+e.target.value;manual();});
$('tSl').addEventListener('input',e=>{S.th=+e.target.value;manual();});
$('pSl').addEventListener('input',e=>{S.P=+e.target.value;manual();});
$('gen').addEventListener('click',runAuto);
$('useOpta').addEventListener('click',()=>{S.th=optaOf(S.county);manual();});
$('lease').addEventListener('input',e=>{S.lease=+e.target.value;renderLedger();});
$('acres').addEventListener('input',e=>{S.acres=+e.target.value;renderLedger();});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{drawSection();drawHeat();});
new MutationObserver(()=>{drawSection();drawHeat();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});

buildTiles();renderBench();renderSystems();renderCrops();buildAssump();runAuto();
