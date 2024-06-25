var container = document.querySelector('.content');
var text = container.innerHTML;
var reg = /\s+.+/g;
var newHTML = text.replace(reg, function (s) {
  s = s.replace(/\s/g, '');
  console.log(s);
  return `<p>${s}</p>`
})

container.innerHTML = newHTML;