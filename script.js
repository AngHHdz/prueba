function handleFile() {
    var fileInput = document.getElementById('excelFile');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var data = event.target.result;
        var workbook = XLSX.read(new Uint8Array(data), {type: 'array'});

        var sheetName = workbook.SheetNames[0];
        var sheet = workbook.Sheets[sheetName];

        // Establecer estilos para las celdas A1 a L1
        var range = XLSX.utils.decode_range(sheet['!ref']);
        for (var R = range.s.r; R <= range.e.r; ++R) {
            for (var C = range.s.c; C <= range.e.c; ++C) {
                var cell_address = {c:C, r:R};
                var cell_ref = XLSX.utils.encode_cell(cell_address);
                if (cell_ref === 'A1' || cell_ref === 'B1' || cell_ref === 'C1' || cell_ref === 'D1' || cell_ref === 'E1' || cell_ref === 'F1' || cell_ref === 'G1' || cell_ref === 'H1' || cell_ref === 'I1' || cell_ref === 'J1' || cell_ref === 'K1' || cell_ref === 'L1') {
                    sheet[cell_ref].s = { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } }};
                }
            }
        }

        // Aquí puedes manipular los datos y generar la tabla dinámica
        var jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(jsonData);
    };

    reader.readAsArrayBuffer(file);
}

document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('excelFile');
    var button = document.querySelector('button');
    button.addEventListener('click', handleFile);
});