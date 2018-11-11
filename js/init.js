(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

    window.showLoader = className => {
      const button = $(`.${className}`)
      const loader = $(`[data-loader-for=${className}]`)
      const result = $(`[data-result-for=${className}]`)

      loader.removeClass('hide')
      result.addClass('hide')
      button.addClass('hide')
    }

    window.hideLoader = className => {
      const button = $(`.${className}`)
      const loader = $(`[data-loader-for=${className}]`)
      const result = $(`[data-result-for=${className}]`)

      loader.addClass('hide')
      result.addClass('hide')
      button.removeClass('hide')
    }

    window.showResult = (className, resultText) => {
      const button = $(`.${className}`)
      const loader = $(`[data-loader-for=${className}]`)
      const result = $(`[data-result-for=${className}]`)

      result.text(resultText)

      loader.addClass('hide')
      button.addClass('hide')
      result.removeClass('hide')
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

    window.updateStatusPage = async () => {
      // const contract = await new Contract(web3, "0xa44D6e0d17507cA98794393526ad566441C4A780", _SchneiderABI)

      if (window.location.pathname == '/status.html') {
        const contract = await new Contract(web3, "0xa44D6e0d17507cA98794393526ad566441C4A780", _SchneiderABI)

        // ...
        $('#status_page_span_number_1').text(await contract.call('curLoad'))
        $('#status_page_span_number_2').text(await contract.call('promisedLoad'))
        $('#status_page_span_number_3').text('Чё')
        $('#status_page_span_number_4').text('сюда?')
        // ...
      }
    }

  }); // end of document ready
})(jQuery); // end of jQuery name space
