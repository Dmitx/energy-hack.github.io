(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

    window.showLoader = className => {
      const button = $(`.${className}`)
      const loader = $(`[data-loader-for=${className}]`)

      loader.removeClass('hide')
      button.addClass('hide')
    }

    window.hideLoader = className => {
      const button = $(`.${className}`)
      const loader = $(`[data-loader-for=${className}]`)

      loader.addClass('hide')
      button.removeClass('hide')
    }

    window.refreshOrderForm = () => {
      const { current_load, percent } = updateOrderForm()

      const promised_load = (current_load || 150) * (100 - percent) / 100

      const save_up = (current_load - promised_load) * 3.77

      updateOrderForm({ promised_load, save_up })
    }

    window.updateOrderForm = ({ promised_load, save_up } = {}) => {
      const form = $('.order')

      const _current_load = form.find('#current-load')
      const _promised_load = form.find('#promised-load')
      
      if (promised_load) _promised_load.text(promised_load)
      if (save_up) $('.save-value').text(save_up.toFixed(2))

      const current_load = parseFloat(_current_load.val())
      const percent = 27 // %

      return { current_load, percent }
    }

    window.submitOrderForm = () => {
      console.log('submit')
    }

  }); // end of document ready
})(jQuery); // end of jQuery name space
