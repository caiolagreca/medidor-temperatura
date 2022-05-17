window.addEventListener('load', () => {
    let lat;
    let long;
    let temperaturaDescricao = document.querySelector('.temperatura__descricao');
    let temperaturaGraus = document.querySelector('.temperatura__graus');
    let localHorario = document.querySelector('.local__horario');
    let iconeClima = document.querySelector('.icone__clima');

    let temperatura = document.querySelector('.temperatura');
    let unidade = document.querySelector('.secao__graus span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( posicao => {
            lat = posicao.coords.latitude;
            long = posicao.coords.longitude;

            const api = `http://api.weatherapi.com/v1/current.json?key=badc1064cebb43e2b55120448221705&q=${lat},${long}&aqi=no`;

            fetch(api)
                .then(resposta => {
                    return resposta.json();
                })
                .then(info => {
// A variável abaixo pode ser buscada da mesma forma que info.current.temp_c
                   const {temp_c} = info.current;
                   const {temp_f} = info.current;
                   const {text} = info.current.condition;
                   const codigoIcone = info.current.condition.icon.substring(35);

// Inserindo elementos da API para o DOM
                    temperaturaGraus.textContent = temp_c;
                    temperaturaDescricao.textContent = text;
                    localHorario.textContent = `${info.location.name}, ${info.location.region}`;
                    iconeClima.innerHTML = `<img src="./weather/${codigoIcone}" alt="Icone do Clima">`;

// Trocando a unidade da temperatura
                    temperatura.addEventListener('click', () => {
                        if (unidade.textContent === 'C°'){
                            unidade.textContent = "F°";
                            temperaturaGraus.textContent = temp_f;
                        } else {
                            unidade.textContent = 'C°';
                            temperaturaGraus.textContent = temp_c;
                        }
                    });
                });
        });
    };
});

