export function winnerModal(modalId) {
    const modal = document.getElementById(modalId);
    const btnPlayAgain = document.querySelector('.btn-play-again');
    const close = document.querySelector('.close')

    // Só exibe o modal se o id 'modal-winner' existir 
    if(modal) { 
        modal.classList.add('show');

        modal.addEventListener('click', (e) => {
            if (e.target.id == modalId || e.target.id == 'close') {
                modal.classList.remove('show');
            }
        });

        btnPlayAgain.addEventListener('click', () => {
            setTimeout(() =>  document.location.reload(true), 500);
        });

        close.addEventListener('click', () => {
            setTimeout(() =>  document.location.reload(true), 500);
        });
    }
}