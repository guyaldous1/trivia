    const socket = io()
    let alreadyPlaying = false

    socket.on('data', init)
    socket.on('newClient', (obj) => {
      if (!alreadyPlaying)
        init(obj)
      alreadyPlaying = true
    })

    function init(obj){
      console.log(obj)
      if (obj.topThree !== undefined){
        const cardLocations = {
          top : obj.topThree,
          bottom : obj.bottomThree,
          goal : obj.currentGoals,
        }

        function cardFlip(location){
          cardType = $(`#${location}-row`)

          const oldCards = cardType.html()
          $(`#${location}-old`).html(oldCards)

          cardType.empty()
          cardLocations[location].forEach(item => {
            cardType.append(renderCard(item,location))
          })
          cardType.fadeIn()
        }
        $('#top-row').fadeOut(() => cardFlip('top'))
        $('#bottom-row').fadeOut(() => cardFlip('bottom'))
        if (obj.action === 'newGame' || obj.action === 'state'){
          $('.wt-popover').removeClass('open')
          $('#goal-row').fadeOut(() => cardFlip('goal'))
        }
      }
    }

    function renderCard(card,location){
      const front = card.front
      const back = card.back
      let img = `images/${back}/${card.version}.jpg`

      const inner = document.createElement('div')
      let name

      switch(location) {
        case 'bottom':

          const number = document.createElement('h2')
          number.innerHTML = front

          name = document.createElement('small')
          name.innerHTML = back

          const layer = document.createElement('div')
          layer.setAttribute('class', 'layer')

          inner.setAttribute('class', 'card')
          inner.appendChild(layer)
          inner.appendChild(number)
          break
        case 'top':
          name = document.createElement('h3')
          name.innerHTML = back

          inner.setAttribute('class', 'card')
          inner.setAttribute('style', `background-image:url("${img}")`)
          break
        case 'goal':
            const goal = card.goal
            const first = card.first
            const other = card.other

            img = `/images/goals/${first}.jpg`

            name = document.createElement('h3')
            name.innerHTML = goal

            const firstP = document.createElement('p')
            firstP.setAttribute('class', 'first')
            firstP.innerHTML = first

            const otherP = document.createElement('p')
            otherP.setAttribute('class', 'other')
            otherP.innerHTML = other

            inner.setAttribute('class', 'card goal')
            inner.appendChild(firstP)
            inner.appendChild(otherP)
        default:
          break
      }

          inner.appendChild(name)
          inner.setAttribute('style', `background-image:url("${img}")`)
          const wrap = document.createElement('div')
          wrap.setAttribute('class', 'col-sm-4')
          wrap.appendChild(inner)
          return wrap
      }

  $(() => {
    $('.btn.ajax').on('click', function(e){
      $('.wt-popover').removeClass('open')
      const action = {action: $(this).attr('value')}
      $.post("/deck",action)
    })
  })
