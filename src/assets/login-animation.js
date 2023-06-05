 document.addEventListener("DOMContentLoaded", function() {
          const body = document.querySelector('body');
          const anchoMitad = window.innerWidth / 2;
          const altoMitad = window.innerHeight / 2;
          let seguirPunteroMouse = true;
          const monster = document.getElementById('monster');
          const inputUsuario = document.getElementById('email');
          const inputClave = document.getElementById('password');
      
          body.addEventListener('mousemove', (m) => {
            if (seguirPunteroMouse) {
              if (m.clientX < anchoMitad && m.clientY < altoMitad) {
                monster.src = "assets/idle/2.png";
              } else if (m.clientX < anchoMitad && m.clientY > altoMitad) {
                monster.src = "assets/idle/3.png";
              } else if (m.clientX > anchoMitad && m.clientY < altoMitad) {
                monster.src = "assets/idle/5.png";
              } else if (m.clientX > anchoMitad && m.clientY > altoMitad) {
                monster.src = "assets/idle/4.png";
              }
            }
          });
      
          inputUsuario.addEventListener('focus', () => {
            seguirPunteroMouse = false;
          });
      
          inputUsuario.addEventListener('blur', () => {
            seguirPunteroMouse = true;
          });
      
          inputUsuario.addEventListener('keyup', () => {
            let usuario = inputUsuario.value.length;
            if (usuario >= 0 && usuario <= 5) {
              monster.src = 'assets/read/1.png';
            } else if (usuario >= 6 && usuario <= 14) {
              monster.src = 'assets/read/2.png';
            } else if (usuario >= 15 && usuario <= 20) {
              monster.src = 'assets/read/3.png';
            } else {
              monster.src = 'assets/read/4.png';
            }
          });
      
          inputClave.addEventListener('focus', () => {
            seguirPunteroMouse = false;
            let cont = 1;
            const cubrirOjo = setInterval(() => {
              monster.src = 'assets/cover/' + cont + '.png';
              if (cont < 8) {
                cont++;
              } else {
                clearInterval(cubrirOjo);
              }
            }, 60);
          });
      
          inputClave.addEventListener('blur', () => {
            seguirPunteroMouse = true;
            let cont = 7;
            const descubrirOjo = setInterval(() => {
              monster.src = 'assets/cover/' + cont + '.png';
              if (cont > 1) {
                cont--;
              } else {
                clearInterval(descubrirOjo);
              }
            }, 60);
          });
      
        
        });