// $('.small.modal')
//     .modal('attach events', '.delete.button', 'show');

$('.message .close')
    .on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade');
    });
// // $('.extra a')
// const links = document.querySelectorAll('.extra a');
// console.log(links);
// links.forEach((link) => {
//     // console.log(link.getAttribute("href"))
//     link = link.getAttribute("href").slice(6);
//     console.log(link);


// })
// const dbt = document.querySelector('.actions .deletebt');
// const splitBT = dbt.getAttribute('action').split('?');
// // console.log(splitBT);
// splitBT.splice(1, 0, '5d4462b7a891ea289894bc2e?');
// const mm = Object.values(splitBT);
// console.log(mm.join(''));
// // spliced.map((e) => {
// //     console.log(e.values);

// // })
// // console.log(typeof (spliced));

// // console.log(spliced);

// // .splice(1, 0, `${link}?`);
// document.querySelector('.actions .deletebt').setAttribute('action', mm.join(''))