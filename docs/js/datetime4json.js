$('input[type=date][name="root[date]"]').each(function(key, value) {
        $(this).datepicker({
          format: "yyyy-mm-dd",
          startView: 2,
          forceParse: true,
          autoclose: true
        })
        .on('changeDate', function() {
         var path = $(this).parents().filter('[data-schemapath]').eq(0).data('schemapath');
         var date = $(this).val();
         $(this).val('');
         editor.getEditor(path).setValue(date);
       });
      });
