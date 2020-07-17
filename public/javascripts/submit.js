    const socket = io()
    let alreadyPlaying = false


    socket.on('data', init)

    socket.on('newClient', (obj) => {
      if (!alreadyPlaying)
        init(obj)
      alreadyPlaying = true
    })


    function renderCard(card){
      let cardArr = card.split("");

      const inner = document.createElement('div')
      inner.setAttribute('class', 'card__grid')

      cardArr.forEach((item, i) => {
        let piece = document.createElement('div')
        piece.setAttribute('class', 'card__grid__item')

        if(item === "1"){
          piece.classList.add('card__grid__item--active')
        }

        inner.appendChild(piece);
      });

      const wrap = document.createElement('div')
      wrap.setAttribute('class', 'card')
      wrap.appendChild(inner)

      return wrap
      }

    function renderCards(cards){
      let cardHolder = $('#card-row');

      cardHolder.empty()
      cards.forEach(item => {
        cardHolder.append(renderCard(item))
      })

    }

    function init(obj){
      console.log(obj)
      let currentCards = obj.currentCards;

      if (currentCards.length > 0){
        renderCards(currentCards);
      } else {
        $('#card-row').empty()
        alert('out of cards')
      }
    }



  $(() => {
    $('.btn.ajax').on('click', function(e){
      $('.wt-popover').removeClass('open')
      const action = {action: $(this).attr('value')}
      $.post("/deck",action)
    })
  })
