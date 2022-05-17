function setupClickListeners() {
    let btnVerTv = document.getElementById('option-1');
    let btnDispositivos = document.getElementById('option-2');

    btnVerTv.addEventListener('click', () => {
        loadTVPage();
    });

    btnDispositivos.addEventListener('click', () => {
        loadConnectionPage();
    });
}