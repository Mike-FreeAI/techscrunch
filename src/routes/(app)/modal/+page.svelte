<div class="u-flex u-gap-32 u-flex-wrap u-main-center">
  <button class="button" onclick="document.getElementById('dialog').showModal();">
    <span class="text">PRESS ME!!</span>
  </button>

  <dialog class="modal" id="dialog" open="">
    <form class="modal-form" method="dialog">
      <header class="modal-header">
        <div class="u-flex u-gap-16 u-main-space-between">
          <h4 class="heading-level-3">Modal title</h4>
          <button class="" aria-label="Close modal" onclick="document.getElementById('dialog').close();">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" viewBox="0 0 460.775 460.775" xml:space="preserve">
              <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
            </svg>
          </button>
        </div>
      </header>
      <div class="modal-content">
        <form class="form">
          <ul class="form-list">
            <li class="form-item">
              <input class="input-text" type="text" placeholder="Full Name" aria-label="Full name">
            </li>
            <li class="form-item">
              <input class="input-text" type="email" placeholder="Email address" aria-label="Email address">
            </li>
          </ul>
        </form>
      </div>
      <div class="modal-footer">
        <div class="u-flex u-main-end u-gap-16">
          <button type="button" class="button is-text">
            <span class="text">Save Updates</span>
          </button>
        </div>
      </div>
    </form>
  </dialog>

</div>
