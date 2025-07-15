const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  navLinks.classList.toggle('active');

  // Change icon based on menu state
  const icon = this.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    icon.style.color = "#01060D"
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    icon.style.color = "#01060D"
  }
});

// Close menu when clicking on a link (optional)
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', function () {
    if (window.innerWidth <= 991) {
      navLinks.classList.remove('active');
      mobileMenuToggle.querySelector('i').classList.remove('fa-times');
      mobileMenuToggle.querySelector('i').classList.add('fa-bars');
    }
  });
});


const productsLink = document.querySelector('.products-link');
const positionFixed = document.querySelector('.positoin-flxed');

let isOverLink = false;
let isOverMenu = false;
let hideTimeout = null;

function updateMenuVisibility() {
  if (isOverLink || isOverMenu) {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    positionFixed.classList.add('active');
  } else {
    hideTimeout = setTimeout(() => {
      positionFixed.classList.remove('active');
      hideTimeout = null;
    }, 150);
  }
}

let bool = true;
productsLink.addEventListener('click', () => {
  if (bool) {
    isOverLink = true;
    updateMenuVisibility();
    bool = false;
  } else {
    isOverLink = false;
    updateMenuVisibility();
    bool = true
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });
  productsLink.classList.add('active');
});

// productsLink.addEventListener('mouseleave', () => {
//   isOverLink = false;
//   updateMenuVisibility();
// });

// positionFixed.addEventListener('mouseenter', () => {
//   isOverMenu = true;
//   updateMenuVisibility();
// });

// positionFixed.addEventListener('mouseleave', () => {
//   isOverMenu = false;
//   updateMenuVisibility();
// });

const gridItems = document.querySelectorAll('.grid-item-card');
const productImage = document.querySelector('.product-img-container img');

const imgSources = [
  '../nav/Product1.png',
  '../nav/Product2.png',
  '../nav/Product3.png',
  '../nav/Product4.png',
  '../nav/Product5.png'
];

const currentProductFromURL = (() => {
  const match = window.location.href.match(/product[1-5]/i);
  return match ? match[0].toLowerCase() : null;
})();

gridItems.forEach((item, index) => {
  // Hover in
  item.addEventListener('mouseenter', () => {
    if (!item.querySelector('img.select-icon')) {
      const img = document.createElement('img');
      img.src = '../nav/green_active.svg';
      img.alt = 'select icon';
      img.classList.add('select-icon');
      item.appendChild(img);
    }

    // Temporary hover image
    if (productImage && index < imgSources.length) {
      productImage.src = imgSources[index];
    }
  });

  // Hover out
  item.addEventListener('mouseleave', () => {
    const icon = item.querySelector('img.select-icon');
    if (icon && !item.classList.contains('active')) {
      item.removeChild(icon);
    }

    // On mouse leave, reset to the image from URL if applicable
    if (currentProductFromURL) {
      // Extract index from product name (e.g., "product3" => 2)
      const urlIndex = parseInt(currentProductFromURL.replace('product', '')) - 1;
      if (productImage && imgSources[urlIndex]) {
        productImage.src = imgSources[urlIndex];
      }
    }
  });

  item.addEventListener('click', () => {
    gridItems.forEach(i => {
      i.classList.remove('active');
      const icon = i.querySelector('img.select-icon');
      if (icon) i.removeChild(icon);
    });

    item.classList.add('active');

    const img = document.createElement('img');
    img.src = '../nav/green_active.svg';
    img.alt = 'select icon';
    img.classList.add('select-icon');
    item.appendChild(img);

    if (productImage && index < imgSources.length) {
      productImage.src = imgSources[index];
    }
  });
});


// const navbar = document.getElementById('navbar');
// const stickyOffset = navbar.offsetTop;

// window.addEventListener('scroll', () => {
//   if (window.pageYOffset > stickyOffset) {
//     navbar.classList.add('fixed');
//   } else {
//     navbar.classList.remove('fixed');
//   }
// });

const demobtn = document.querySelector('.nav-button');

demobtn.addEventListener('click', () => {
  window.location.href = '../contact/index.html#contactSection';
});

const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
  window.location.href = "../homepage"; 
});
