$( document ).ready(function() {


  //show & hide last cards
  const oldSection = $('#oldCards')

  $('#openOld').on('click', function(e){
    oldSection.addClass('open')
  })

  $('#closeOld').on('click', function(e){
    oldSection.removeClass('open')
  })


  //darkmode
  function checkDarkmode(){
    const darkMode = localStorage.getItem("darkmode")

    if(darkMode === 'true'){
      $('body').addClass('darkmode')
    } else {
      $('body').removeClass('darkmode')
    }
  }

  checkDarkmode()


  $('#dark-mode').on('click', function(e){
    const darkMode = localStorage.getItem("darkmode")

    if(darkMode !== 'true'){
      localStorage.setItem("darkmode", "true")
    } else {
      localStorage.setItem("darkmode", "false")
    }

    checkDarkmode()
  })


  //new game pop-over
  const newGame = $('#newGame')

  let part1 = $('#newGame--p1')
  let part2 = $('#newGame--p2')

  part2.addClass('d-none')

  $('#openNew').on('click', function(e){
    newGame.addClass('open')
  })

  $('#part2Nav').on('click', function(){
    part1.addClass('d-none')
    part2.removeClass('d-none')
  })

  $('#closeNew').on('click', function(e){
    newGame.removeClass('open')
    part2.addClass('d-none')
    part1.removeClass('d-none')
  })

})
