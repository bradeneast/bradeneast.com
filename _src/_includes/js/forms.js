import { $$, attr } from './utils.js';

export function watchForms() {
  $$('form').forEach(form => {

    let params = new URLSearchParams(location.search);

    $$('input, textarea, select', form).forEach(input => {
      let { type, id } = input;
      if (type == 'submit') return;
      if (type == 'radio' || type == 'checkbox')
        input.checked = params.get(id);
      input.value = params.get(id);
    })

    function handleInput(event) {

      let target = event.target;
      let id = target.id;

      if (!target.hasAttribute('data-has-conditional')) return;

      $$('[data-condition]', form).forEach(conditional => {
        let ref = attr(conditional, 'data-condition');
        conditional.classList.toggle('hidden', ref != id);
        conditional.setAttribute('required', ref == id);
      })
    }

    function handleSubmit(e) {

      e.preventDefault();

      let formData = new FormData(form);
      formData.set("form-name", form.name);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(response => {
          console.log(response);
          setTimeout(() => form.classList.add('success'));
        })
        .catch((error) => alert(error));
    }

    form.addEventListener('input', handleInput);
    form.addEventListener("submit", handleSubmit);
  })
}