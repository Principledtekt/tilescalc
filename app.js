document.querySelector('#menu').addEventListener("click", function () {
    let footer = document.querySelector('footer');
    footer.style.bottom == '8px' ? footer.removeAttribute('style') : footer.style.bottom = '8px';
    // console.log('qw') 
}
);

document.querySelector('#p-s').addEventListener("click", () => {
    let sc = document.getElementById('s-c');
    let surfNum = Number(sc.textContent) + 1;
    sc.innerText = surfNum;
    const colors = ['0', '0', '#9ccc9a', '#7fc3c5', '#7f92c5', '#c5b87f', '#8e8ac2', '#7fbdc5', '#c5b87f', '#7fc596', '#af7fc5', '#c5bb7f'];
   
    document.getElementById('p-s').insertAdjacentHTML("beforebegin", `<fieldset class="is-s">
        <legend style="background-color: ${colors[surfNum]}">Плоскость №<span id="sf-n${surfNum}">${surfNum}</span>
            <textarea name="" id="sf-t${surfNum}"></textarea>
        </legend>
        <label class="i-sf" id="i-w-s-l${surfNum}">
            ширина:
            <br><input type="number" name="" id="i-w-s${surfNum}">
        </label>
        <label class="i-sf" id="i-h-s-l${surfNum}">
            высота:
            <br><input type="number" name="" id="i-h-s${surfNum}">
        </label>
        <span class="m" id="in-m-surface">метр, м</span>
    </fieldset>`)

    document.getElementById('output-btn').insertAdjacentHTML("beforebegin",
        `<fieldset id="outs-surface${surfNum}">
        <legend style="background-color: ${colors[surfNum]}">Плоскость №${surfNum}<output id="out-surface${surfNum}"> Lorem ipsum dolor sit amet consectetur adipisicing
                elit.</output></legend>
        <label>Площадь: <output id="out-area-surf${surfNum}"></output> м<sup>2</sup></label>
        <br><label>Ширина: <output id="out-width-surf${surfNum}"></output> м</label>
        <label>Высота: <output id="out-height-surf${surfNum}"></output> м</label>

    </fieldset>
    
    <fieldset class="outs-tile1">
        <legend style="background-color: ${colors[surfNum]}">Плитка <output id="out-tile${surfNum}">Lorem ipsum dolor sit amet.</output></legend>
        <label>Размер: <output id="out-width${surfNum}"></output>×<output id="out-height${surfNum}"></output> см = <output id="out-area-tile${surfNum}"></output> м<sup>2</sup></label>
        <!-- <label>Площадь одной штуки: <output id="out-area-tile${surfNum}"></output> м<sup>2</sup></label> -->
        <br><label>Количество: <output id="out-qty-tileM${surfNum}"></output> ― <output id="out-qty-tile${surfNum}"></output>
            шт. = <output id="out-area-all-tileM${surfNum}"></output> ― <output id="out-area-all-tile${surfNum}"></output>
            м<sup>2</sup></label>
        <!-- <br><label>Площадь всех: <output id="out-area-all-tileM${surfNum}"></output> – <output id="out-area-all-tile${surfNum}"></output> м<sup>2</sup></label> -->
        <br><label class="hr">Горизонтальный ряд: <output id="out-row-qty-tileR${surfNum}"></output><output id="out-row-qty-tile${surfNum}"></output> шт.</label>
        <br><label>Остаётся <mark class="keep"><output id="o-raw-keep${surfNum}"></output></mark> <span class="cut-line">
                | </span> <mark class="cut"><output id="o-raw-cut${surfNum}"></output></mark> отрезается см</label>
        <br><label class="hr">Вертикальный ряд: <output id="out-col-qty-tileR${surfNum}"></output><output id="out-col-qty-tile${surfNum}"></output> шт.</label>
        <br><label>Остаётся <mark class="keep"><output id="o-col-keep${surfNum}"></output></mark> <span class="cut-line">
                | </span> <mark class="cut"><output id="o-col-cut${surfNum}"></output></mark> отрезается см</label>
    </fieldset>
    <button id="draw-btn-surface${surfNum}" onclick="let c=document.getElementById('surface${surfNum}');
    c.hidden==true?c.hidden=false:c.hidden=true;">Рисунок</button>
    <canvas id="surface${surfNum}" width="700" height="600"></canvas>
    <fieldset class="outs-other">
        <legend style="background-color: ${colors[surfNum]}">Материалы, инструменты</legend>
        <label id="o-adhesive-l"><output id="out-adhesive${surfNum}"></output></label>
        <label id="o-grout-l"><output id="out-grout${surfNum}"></output></label>
        <label id="o-cross-l"><output id="out-cross${surfNum}"></output></label>
        <label id="o-level-l"><output id="out-level${surfNum}"></output></label>
        <label id="o-primer-l"><output id="out-primer${surfNum}"></output></label>
        <label id="o-other-l"><output id="out-other${surfNum}"></output></label>

    </fieldset>`
    );
});
function $d(id) { return document.getElementById(id) };
function level(w, h, a, s) { return ((w || h) > 100 ? 5 / a : 4 / a) * s };
function plusProcent(n, p) { return n * (p / 100) + n };
function bags(bw, adh) { return Math.ceil(adh / bw) };

$d('copy').addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText($d('tmd').textContent);
        this.innerText = "Скопировано";
        setTimeout(() => { this.innerText = "Копировать•" }, 2000);
    }
    catch (err) {
        this.innerText = err;
        
    }
})

let wTile = document.getElementById('in-width-tile');
let hTile = document.getElementById('in-height-tile');
let wTileV = wTile.value;
let hTileV = hTile.value;
let vhsv = document.getElementById('vhs');

function vhs(wTileV, hTileV) {
    if (wTileV > hTileV) { vhsv.innerText = "Горизонтально" };
    if (hTileV > wTileV) { vhsv.innerText = "Вертикально" };
    if (wTileV == hTileV) { vhsv.innerText = "Квадрат" }
};
vhsv.addEventListener("click", () => {
    wTileV = wTile.value;
    hTileV = hTile.value;
    vhs(wTileV, hTileV);
});

let tSizes = document.getElementById("tile-sizes");
tSizes.addEventListener("change", () => {
    tsv = tSizes.value
    if (tsv) {
        tsv = tsv.split(' ');

        // vpisyvanije iz select i per. v fn
        vhs(wTile.value = tsv[0],
            hTile.value = tsv[1]);
        
    }

});

document.getElementById('swap-w-h-tile').addEventListener("click", () => {
    wTileV = wTile.value;
    hTileV = hTile.value;

    // destrukturizacija chtoby pomjenjat' mjestami
    [wTileV, hTileV] = [hTileV, wTileV];
    wTile.value = wTileV;
    hTile.value = hTileV;
    vhs(wTileV, hTileV);
});

document.getElementById('input-btn').addEventListener("click", () => {
   
    var ssurfArea = 0;
    var sqtyTMin = 0;
    var sqtyTMax = 0;
    var sareaTMin = 0;
    var sareaTMax = 0;
    var sadhesive1 = 0;
    var sadhesive2 = 0;
    var sgrout = 0;
    var scros = 0;
    var slev = 0;
    var sprim = 0;
    var adhThick1 = +$d('adh-thick-1').value;
    var adhThick2 = +$d('adh-thick-2').value;
    let promises = [];
    document.querySelectorAll('.is-s').forEach((_, index) => {
        var sNum = ++index;

        var wSurf = +document.getElementById(`i-w-s${sNum}`).value;
        var hSurf = +document.getElementById(`i-h-s${sNum}`).value;
        var surfTxa = document.getElementById("tile1").value;

        var wTileV = +document.getElementById('in-width-tile').value;
        var hTileV = +document.getElementById('in-height-tile').value;
        var tailTxa = document.getElementById("tile1").value;

       
        var adhConsump = +$d('adh-consump').value;

        var gd = +$d('i-grout-gd').value;
        


        var inp = {
            w_surf: wSurf,
            h_surf: hSurf,
            w_tile: wTileV,
            h_tile: hTileV,
            th_tile: +document.getElementById("in-thick-tile").value,
            res_tile: +document.getElementById("i-r-t").value,
            w_gap: +document.getElementById("in-width-gap-tile").value, // / 1000
            depth_gap: +document.getElementById("in-depth-gap-tile").value,
            ch_adh: $d('ch-adhesive').checked,
            adh_thick_1: adhThick1,
            adh_thick_2: adhThick2,
            adh_consump: adhConsump,
            ch_gro: $d('ch-grout').checked,
            gd: gd,
            s_num: sNum
        }
        // document.getElementById('surface1').setAttribute("width", "800");
        promises.push(wasm_bindgen().then(() => {
            var a = wasm_bindgen.run(JSON.stringify(inp));
            var j = JSON.parse(a);
            // console.log(a)
            // console.log(j)

            //  j.s_area;
            ssurfArea += $d(`out-area-surf${sNum}`).innerHTML = j.s_area;
            $d(`out-area-tile${sNum}`).innerHTML = j.t_area;
            $d(`out-row-qty-tileR${sNum}`).innerHTML = j.n_o_row_c;
            $d(`out-row-qty-tile${sNum}`).innerText = ' (' + j.n_of_row.toFixed(3) + ')';
            $d(`out-col-qty-tileR${sNum}`).innerText = j.n_o_col_c;
            $d(`out-col-qty-tile${sNum}`).innerText = ' (' + j.n_of_col.toFixed(3) + ')';
            sqtyTMin += $d(`out-qty-tileM${sNum}`).innerText = j.n_of_tails_min;
            sqtyTMax += $d(`out-qty-tile${sNum}`).innerText = j.n_of_tails_max;
            $d(`out-width-surf${sNum}`).innerText = wSurf;
            $d(`out-height-surf${sNum}`).innerText = hSurf;
            $d(`out-width${sNum}`).innerText = wTileV;
            $d(`out-height${sNum}`).innerText = hTileV;
            $d(`out-surface${sNum}`).innerText = surfTxa;
            $d(`out-tile${sNum}`).innerText = tailTxa;
            sareaTMin += $d(`out-area-all-tileM${sNum}`).innerText = +j.ts_area_min.toFixed(3);
            sareaTMax += $d(`out-area-all-tile${sNum}`).innerText = +j.ts_area_max.toFixed(3);

            $d(`o-raw-keep${sNum}`).innerText = j.keep_r.toFixed(1);
            $d(`o-col-keep${sNum}`).innerText = j.keep_c.toFixed(1);
            $d(`o-raw-cut${sNum}`).innerText = j.cut_r.toFixed(1);
            $d(`o-col-cut${sNum}`).innerText = j.cut_c.toFixed(1);
            if ($d('ch-adhesive').checked) {

                var adhTxa = document.getElementById('ch-adhesive-tarea').value;

                
                $d(`out-adhesive${sNum}`).innerHTML = `Клей: <i>${adhTxa}</i>
                <br>слой ${adhThick1} мм ― ${(sadhesive1 += j.adh_1).toFixed(3)} кг
                <br>слой ${adhThick2} мм ― ${(sadhesive2 += j.adh_2).toFixed(3)} кг`;
                
            }
            if ($d('ch-grout').checked) {
                var groTxa = document.getElementById('ch-grout-tarea').value;

                
                $d(`out-grout${sNum}`).innerHTML = `<br>Затирка: ${groTxa}
                <br> 
                ${sgrout += +j.grout.toFixed(3)} кг`;

            }
            if ($d('ch-cross').checked) {
                
                $d(`out-cross${sNum}`).innerHTML = `<br>Крестики: ${$d('ch-cross-tarea').value}
                <br>${scros += j.n_of_tails_min * 4} шт.`;
            };
            if ($d('ch-level').checked) {
                var lev = level(wTileV, hTileV, j.t_area, j.s_area);
                slev += lev;
                $d(`out-level${sNum}`).innerHTML = `<br>СВП: ${$d('ch-level-tarea').value}
                <br>${Math.ceil(lev)} шт.`;
            };
            if ($d('ch-primer').checked) {
                var primC = $d('i-prim-c').value;
                var prim = primC * j.s_area;
                sprim += prim;
                $d(`out-primer${sNum}`).innerHTML = `<br>Грунтовка: ${$d('ch-primer-tarea').value}
                <br>${prim.toFixed(3)} л.`;
            };
            if ($d('ch-other').checked) {
                $d(`out-other${sNum}`).innerHTML = `<br>${$d('ch-other-tarea').value}`;
            };


            
        }))

    })
    Promise.all(promises).then(() => {
        var reserv = +$d('i-r-t').value;
        var sqtyTMinr = Math.ceil(plusProcent(sqtyTMin, reserv));
        var sqtyTMaxr = Math.ceil(plusProcent(sqtyTMax, reserv));
        var sareaTMinr = plusProcent(sareaTMin, reserv).toFixed(3);
        var sareaTMaxr = plusProcent(sareaTMax, reserv);
        var bagWeight = +$d('adh-bag').value;

        // console.log(a);
        $d('s-surf-area').innerText = ssurfArea;
        $d('s-qty-t-min').innerText = sqtyTMin;
        $d('s-qty-t-max').innerText = sqtyTMax;
        $d('s-qty-t-min-r').innerText = sqtyTMinr;
        $d('s-qty-t-max-r').innerText = sqtyTMaxr;
        $d('s-area-t-min').innerText = sareaTMin.toFixed(3);
        $d('s-area-t-max').innerText = sareaTMax.toFixed(3);
        $d('s-area-t-min-r').innerText = sareaTMinr;
        $d('s-area-t-max-r').innerText = sareaTMaxr.toFixed(3);
        document.querySelectorAll('.proc').forEach(e => { e.innerText = reserv });
        $d('s-adh-thick-1').innerText = adhThick1;
        $d('s-adh-1').innerText = sadhesive1.toFixed(3);
        $d('s-adh-bag-1').innerText = bags(bagWeight, sadhesive1);
        $d('s-adh-thick-2').innerText = adhThick2;
        $d('s-adh-2').innerText = sadhesive2.toFixed(3);
        $d('s-adh-bag-2').innerText = bags(bagWeight, sadhesive2);
        $d('s-grout').innerText = sgrout.toFixed(3);
        $d('s-cross').innerText = scros;
        if (slev !== 0) {

            $d('levd').hidden = false;
            $d('s-lev').innerText = Math.ceil(slev);
        }
        if (sprim !== 0) {
            $d('primd').hidden = false;
            $d('s-prim').innerText = sprim.toFixed(3);
        }

        $d('tmd').innerHTML = `
                Площадь: **${ssurfArea}** м&sup2;
            <br>Плитка: ${sqtyTMin} + ${reserv} % ≈ **${sqtyTMinr}** шт. ${sareaTMinr} м&sup2;
            `;

    });



});