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

  $('#openNew').on('click', function(e){
    newGame.addClass('open')
  })

  $('#closeNew').on('click', function(e){
    newGame.removeClass('open')
  })

})
