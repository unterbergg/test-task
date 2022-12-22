document.addEventListener("DOMContentLoaded", () => {

    let counter = 0;
    let active = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
                entry.target.classList.add('visible');
            }
        });
    });
    observer.observe(document.querySelector('.services'));

    const services = document.querySelector(".services");
    function handleShowing(e) {
        const items = document.querySelector('.services__list').querySelectorAll('li:not(.showing)');

        if (items.length) {
            e.preventDefault();
            e.stopPropagation();
            if (active === false) {
                active = true;
                items[0].classList.add('showing');
                setTimeout(() => {
                    active = false;
                }, 600)
            }
            return false;
        }
    }

    services.addEventListener("wheel", handleShowing, { passive: false });

    services.addEventListener("touchstart", function (e) {
        const items = document.querySelector('.services__list').querySelectorAll('li');
        if (document.querySelector('.services__list').querySelectorAll('li.showing').length === 0) {
            document.querySelector('body').classList.add('overflowHidden');
            document.querySelector('.services__arrow').classList.toggle('hide');
        }
        if (counter < items.length) {

            e.preventDefault();
            e.stopPropagation();
            if (active === false) {
                active = true;
                if ((counter-2) != items.length) {
                    items.forEach((value, key) => {
                        if (value.classList.contains('showing')) {
                            value.classList.add('hidden');
                        }
                        // value.classList.remove('showing');
                    })

                    items[counter].classList.add('showing');
                }
                setTimeout(() => {
                    active = false;
                    counter++;
                }, 200)
            }
            return false;
        } else {
            document.querySelector('body').classList.remove('overflowHidden');
            if (counter == items.length) {
                counter++;
                document.querySelector('.services__arrow').classList.toggle('hide');
            }
        }
    }, { passive: false });
})