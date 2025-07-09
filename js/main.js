/* --- style.css for GreenTrend - Improved Aesthetics --- */

/* IMPORTS & ROOT VARIABLES */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Open+Sans:wght@300;400;600;700&display=swap');

:root {
    /* Colors - Slightly refined palette for modern feel */
    --primary-color: #f43397; /* Retained: Vibrant pink/magenta */
    --primary-hover-color: #d12b80; /* Slightly darker pink for hover */
    --secondary-color: #555555; /* Softer dark gray for general text */
    --accent-color: #00bf8a; /* Retained: Green for success/highlights */
    --accent-dark-color: #00a377; /* Darker green for hover */
    --text-color-dark: #2c2c2c; /* Deeper dark for headings */
    --text-color-light: #ffffff;
    --background-light: #f8f8f8; /* Very light gray for subtle contrast */
    --background-card: #ffffff; /* White for cards and main content areas */
    --background-dark: #262626; /* Darker footer/dark sections */
    --border-color: #e0e0e0; /* Softer border color */
    --input-border-focus: rgba(244, 51, 151, 0.3); /* Slightly more prominent focus */

    /* Fonts - Added light weights */
    --heading-font: 'Lato', sans-serif;
    --body-font: 'Open Sans', sans-serif;

    /* Shadows - More pronounced but still soft */
    --shadow-light: 0 4px 12px rgba(0, 0, 0, 0.08); /* More visible */
    --shadow-medium: 0 8px 20px rgba(0, 0, 0, 0.15); /* Stronger for hover/modals */

    /* Border Radius - Slightly more rounded */
    --border-radius-sm: 6px; /* Increased from 4px */
    --border-radius-md: 10px; /* Increased from 8px */
    --border-radius-lg: 14px; /* Increased from 12px */

    /* Spacing - Minor tweaks for better flow */
    --padding-section-desktop: 60px 0; /* Increased padding */
    --padding-section-mobile: 40px 0; /* Increased padding */
    --container-max-width: 1200px;
}

/* --- Base Styles --- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--body-font);
    line-height: 1.7; /* Increased for better readability */
    color: var(--secondary-color); /* Using secondary for general text */
    background-color: var(--background-light);
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 20px; /* Increased horizontal padding */
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--heading-font);
    color: var(--text-color-dark);
    margin-bottom: 20px; /* Increased margin */
    line-height: 1.25;
    font-weight: 700;
}
h1 { font-size: 3.2em; /* Larger headings */ }
h2 { font-size: 2.6em; }
h3 { font-size: 1.8em; }

p {
    margin-bottom: 20px; /* Increased margin */
}

a {
    text-decoration: none;
    color: var(--primary-color);
    transition: color 0.3s ease, transform 0.2s ease; /* Added transform */
}
a:hover {
    color: var(--primary-hover-color);
    transform: translateY(-1px); /* Subtle lift on hover */
}
img { max-width: 100%; height: auto; display: block; }
ul { list-style: none; }

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px; /* Increased padding */
    font-size: 1.05em; /* Slightly larger font */
    font-weight: 600;
    text-align: center;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.8px; /* Increased letter-spacing */
    min-width: 140px; /* Slightly wider */
    border: none;
}
.btn-primary {
    background-color: var(--primary-color);
    color: var(--text-color-light);
    box-shadow: var(--shadow-light); /* Stronger initial shadow */
}
.btn-primary:hover {
    background-color: var(--primary-hover-color);
    transform: translateY(-2px); /* More pronounced lift */
    box-shadow: var(--shadow-medium); /* Stronger hover shadow */
}
.btn-accent {
    background-color: var(--accent-color);
    color: var(--text-color-light);
    box-shadow: var(--shadow-light);
}
.btn-accent:hover {
    background-color: var(--accent-dark-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
}

/* --- Header & Navigation (Image 1 Style) --- */
.main-header {
    background-color: var(--background-card);
    padding: 12px 0; /* Slightly more compact */
    box-shadow: var(--shadow-light);
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    border-bottom: 1px solid var(--border-color);
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px; /* Increased gap */
    padding: 0 20px;
}

.logo {
    display: flex;
    align-items: center;
    font-family: var(--heading-font);
    font-size: 1.5em; /* Slightly larger logo text */
    font-weight: 700;
    color: var(--primary-color);
    white-space: nowrap;
    flex-grow: 1;
    justify-content: center;
}
.logo img {
    height: 35px; /* Slightly larger logo image */
    margin-right: 10px; /* Increased margin */
}

.currency-toggle-button {
    background-color: var(--primary-color);
    color: var(--text-color-light);
    border: none;
    border-radius: var(--border-radius-sm);
    padding: 8px 12px; /* Increased padding */
    font-size: 0.85em; /* Slightly larger font */
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    text-transform: uppercase;
    box-shadow: var(--shadow-light);
    order: 3;
}
.currency-toggle-button:hover {
    background-color: var(--primary-hover-color);
    transform: translateY(-1px);
}

.nav-toggle {
    display: block;
    font-size: 1.6em; /* Slightly larger hamburger icon */
    cursor: pointer;
    color: var(--text-color-dark);
    order: 1;
}

/* --- Search Bar (Below Top Row) --- */
.search-container {
    margin-top: 15px; /* Increased space from top row */
    padding: 0 20px;
    position: relative;
    max-width: 100%;
    display: flex;
    align-items: center;
}

.search-input {
    flex-grow: 1;
    padding: 10px 50px 10px 20px; /* Increased padding */
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    font-size: 0.95em; /* Slightly larger font */
    color: var(--text-color-dark);
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.search-input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px var(--input-border-focus); /* More visible focus */
}

.search-button {
    position: absolute;
    right: 20px; /* Align with container padding */
    top: 50%;
    transform: translateY(-50%);
    width: 45px; /* Slightly wider */
    height: calc(100% - 2px);
    background-color: var(--primary-color);
    color: var(--text-color-light);
    border: none;
    border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.search-button:hover {
    background-color: var(--primary-hover-color);
}
.search-button i {
    font-size: 1.1em; /* Slightly larger icon */
}

.search-results {
    top: calc(100% + 8px); /* More space from input */
    left: 20px;
    width: calc(100% - 40px);
    max-height: 280px; /* Increased max height */
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-medium);
    padding: 8px 0; /* Increased padding */
}
.search-results a {
    padding: 10px 20px; /* Increased padding */
    font-size: 0.95em;
}
.search-results a img {
    width: 35px; /* Slightly larger image */
    height: 35px;
    margin-right: 12px;
}
.search-results .no-results-msg {
    padding: 12px 20px;
}


/* --- Hero Section (Homepage Only) --- */
.hero-section {
    background-color: #666; /* Slightly darker grey for better contrast */
    color: var(--text-color-light);
    text-align: center;
    padding: var(--padding-section-desktop);
    min-height: 420px; /* Increased height */
    margin: 25px auto; /* More margin */
    max-width: calc(var(--container-max-width) - 40px); /* Adjust to fit container width */
    border-radius: var(--border-radius-lg); /* More rounded corners */
    box-shadow: var(--shadow-medium); /* Stronger shadow */
    background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://via.placeholder.com/1200x450/666666/ffffff?text=Modern+Kitchen'); /* Placeholder image with overlay */
    background-size: cover;
    background-position: center;
}
.hero-section h1 {
    font-size: 3.8em; /* Even larger heading */
    margin-bottom: 20px;
    color: var(--text-color-light);
    text-shadow: 2px 2px 5px rgba(0,0,0,0.5); /* More prominent shadow */
    font-weight: 900;
}
.hero-section p {
    font-size: 1.25em; /* Larger paragraph */
    margin-bottom: 40px; /* More margin */
    max-width: 800px;
    opacity: 0.98;
    color: rgba(255, 255, 255, 0.95);
}

/* --- Section Titles --- */
.section-title,
.categories-section h2,
.featured-products-section h2 {
    text-align: center;
    margin-bottom: 45px; /* More space below title */
    font-size: 3em; /* Larger section titles */
    color: var(--text-color-dark);
    position: relative;
    padding-bottom: 15px; /* More space for underline */
    font-weight: 800; /* Bolder */
}
.section-title::after,
.categories-section h2::after,
.featured-products-section h2::after {
    width: 100px; /* Longer underline */
    height: 5px; /* Thicker underline */
}

/* --- Category List (Homepage) --- */
.categories-section {
    padding: var(--padding-section-desktop);
}
.category-list {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Slightly larger min-width */
    gap: 30px; /* Increased gap */
}
.category-card {
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-light); /* Initial shadow */
    border: none; /* No initial border, let shadow define separation */
    padding: 20px; /* Increased padding */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.category-card:hover {
    transform: translateY(-5px); /* More pronounced lift */
    box-shadow: var(--shadow-medium); /* Stronger hover shadow */
}
.category-card img {
    width: 90px; /* Larger image */
    height: 90px;
    margin-bottom: 12px;
}
.category-card span {
    font-weight: 700; /* Bolder text */
    font-size: 1.05em; /* Slightly larger font */
}

/* --- Product Grid (Homepage Featured & Products Page) --- */
.featured-products-section,
.products-page .products-section {
    padding: var(--padding-section-desktop);
    background-color: var(--background-light); /* Light background for section */
}
.product-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Larger min-width for cards */
    gap: 30px; /* Increased gap */
}
.product-card {
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-light);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.product-card:hover {
    transform: translateY(-5px); /* More pronounced lift */
    box-shadow: var(--shadow-medium);
}
.product-card img {
    height: 200px; /* Taller images */
}
.product-card .product-details {
    padding: 20px; /* Increased padding */
}
.product-card h3 {
    font-size: 1.25em; /* Larger product titles */
    font-weight: 700;
    margin-bottom: 10px;
    min-height: 50px; /* Consistent height for titles */
}
.product-card .price {
    font-size: 1.4em; /* Larger price */
    margin-bottom: 10px;
}
.product-card .price .current-price {
    margin-right: 10px;
}
.product-card .price .original-price {
    font-size: 0.9em;
}
.product-card .rating {
    font-size: 1em;
    margin-bottom: 15px;
}
.product-card .buy-btn {
    padding: 12px 15px; /* More padding for button */
    font-size: 1em; /* Slightly larger font */
    font-weight: 700;
}

.view-all-btn-container {
    margin-top: 50px; /* More space above button */
}
/* .view-all-button styles are now handled by .btn .btn-primary */


/* --- Product Detail Page --- */
.product-detail-section {
    padding: var(--padding-section-desktop);
}
.product-detail-content {
    gap: 40px; /* Increased gap */
    padding: 40px; /* Increased padding */
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-medium);
    max-width: 1100px; /* Slightly wider */
}
.product-image-gallery {
    min-width: 400px; /* Larger minimum width */
    max-height: 500px; /* Larger max height */
    padding: 25px; /* Increased padding */
}
.product-info h1 {
    font-size: 2.8em; /* Larger title */
    margin-bottom: 10px;
}
.product-info .price-details {
    margin-bottom: 25px;
    gap: 15px;
}
.product-info #product-detail-price {
    font-size: 3em; /* Larger price */
}
.product-info .original-price {
    font-size: 1.2em;
}
.product-info .discount-percent {
    padding: 6px 10px; /* More padding */
    font-size: 1.1em;
}
.product-info .rating {
    font-size: 1.15em;
    margin-bottom: 25px;
}
.product-info p.description-text {
    font-size: 1.05em;
    margin-bottom: 30px;
}
.product-features h3 {
    font-size: 1.3em;
    margin-top: 25px;
    margin-bottom: 12px;
}
.product-features ul li {
    font-size: 1em;
    margin-bottom: 10px;
    padding-left: 30px;
}
.product-features ul li::before {
    font-size: 1.2em;
    top: 3px;
}
.action-buttons {
    margin-top: 40px;
    gap: 25px;
}
.buy-now-btn {
    font-size: 1.2em;
    padding: 16px 30px;
}

/* --- About & Contact Pages (General Content) --- */
.content-section {
    padding: var(--padding-section-desktop);
    background-color: var(--background-card);
}
.content-section h1,
.content-section h2 {
    margin-bottom: 40px;
    font-size: 2.8em;
}
.content-block {
    max-width: 900px;
    margin: 0 auto 40px auto;
    padding: 30px 40px;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-medium); /* Stronger shadow */
    line-height: 1.9; /* More spacious line height */
}
.content-block p,
.content-block ul {
    margin-bottom: 20px;
    font-size: 1.05em;
}
.contact-info li {
    margin-bottom: 15px;
    font-size: 1.1em;
}
.contact-info li i {
    margin-right: 12px;
    font-size: 1.3em;
}


/* --- Footer --- */
.main-footer {
    background-color: var(--background-dark);
    color: var(--text-color-light);
    padding: 40px 0; /* More padding */
    font-size: 0.95em;
}
.footer-content {
    gap: 30px; /* Increased gap */
    margin-bottom: 30px;
    padding: 0 20px;
}
.footer-column {
    min-width: 200px;
    max-width: 300px;
}
.footer-column h3 {
    color: var(--primary-color);
    font-size: 1.25em; /* Slightly larger */
    margin-bottom: 18px;
    letter-spacing: 1px;
}
.footer-column p {
    color: rgba(255, 255, 255, 0.85); /* Brighter text */
    margin-bottom: 12px;
}
.footer-column ul li {
    margin-bottom: 10px;
}
.footer-column ul li a {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1em;
}
.footer-column ul li a:hover {
    color: var(--accent-color);
    transform: translateX(3px); /* Subtle slide effect */
}
.social-links {
    gap: 15px;
    margin-top: 20px;
}
.social-links a {
    font-size: 1.6em; /* Larger icons */
}
.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 25px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9em;
}


/* --- Responsive Design (Media Queries) --- */

/* Tablet & Smaller Desktops (max-width 992px) */
@media (max-width: 992px) {
    h1 { font-size: 2.8em; }
    h2 { font-size: 2.2em; }
    h3 { font-size: 1.6em; }

    .container {
        padding: 0 15px; /* Standardize padding */
    }

    .main-header {
        padding: 10px 0;
    }
    .navbar {
        padding: 0 15px;
    }
    .logo {
        font-size: 1.4em;
    }
    .logo img {
        height: 30px;
    }
    .currency-toggle-button {
        padding: 7px 10px;
        font-size: 0.8em;
    }
    .nav-toggle {
        font-size: 1.5em;
    }

    .search-container {
        margin-top: 12px;
        padding: 0 15px;
    }
    .search-input {
        padding: 9px 45px 9px 15px;
        font-size: 0.9em;
    }
    .search-button {
        right: 15px;
        width: 40px;
    }
    .search-results {
        left: 15px;
        width: calc(100% - 30px);
    }
    .search-results a {
        padding: 9px 15px;
        font-size: 0.9em;
    }
    .search-results a img {
        width: 30px;
        height: 30px;
    }

    .hero-section {
        padding: var(--padding-section-mobile);
        min-height: 350px;
        margin: 20px auto;
    }
    .hero-section h1 {
        font-size: 3em;
    }
    .hero-section p {
        font-size: 1.1em;
    }
    .section-title, .categories-section h2, .featured-products-section h2 {
        font-size: 2.5em;
        margin-bottom: 35px;
    }
    .section-title::after, .categories-section h2::after, .featured-products-section h2::after {
        width: 80px;
        height: 4px;
    }
    .categories-section,
    .featured-products-section,
    .products-page .products-section,
    .product-detail-section,
    .content-section {
        padding: var(--padding-section-mobile);
    }
    .category-list {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 25px;
    }
    .category-card {
        padding: 18px;
    }
    .category-card img {
        width: 80px;
        height: 80px;
    }
    .category-card span {
        font-size: 1em;
    }

    .product-grid {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 25px;
    }
    .product-card img {
        height: 180px;
    }
    .product-card .product-details {
        padding: 18px;
    }
    .product-card h3 {
        font-size: 1.15em;
        min-height: 45px;
    }
    .product-card .price {
        font-size: 1.3em;
    }
    .product-card .rating {
        font-size: 0.95em;
    }
    .product-card .buy-btn {
        padding: 10px 15px;
        font-size: 0.95em;
    }
    .view-all-btn-container {
        margin-top: 40px;
    }

    .product-detail-content {
        gap: 30px;
        padding: 30px;
    }
    .product-image-gallery {
        min-width: unset;
        width: 100%;
        max-height: 400px;
    }
    .product-info h1 {
        font-size: 2.4em;
    }
    .product-info .price-details {
        margin-bottom: 20px;
    }
    .product-info #product-detail-price {
        font-size: 2.6em;
    }
    .product-info .description-text {
        font-size: 1em;
    }
    .action-buttons {
        margin-top: 30px;
        gap: 20px;
    }
    .buy-now-btn {
        font-size: 1.1em;
        padding: 14px 25px;
    }

    .content-section h1, .content-section h2 {
        font-size: 2.4em;
        margin-bottom: 35px;
    }
    .content-block {
        padding: 25px 30px;
        line-height: 1.7;
    }
    .contact-info li {
        font-size: 1em;
    }
    .contact-info li i {
        font-size: 1.2em;
    }

    .footer-content {
        gap: 25px;
        padding: 0 15px;
    }
    .footer-column {
        max-width: 80%;
    }
    .footer-column h3 {
        font-size: 1.15em;
    }
    .social-links {
        justify-content: center;
    }
}

/* Mobile (max-width 767px) */
@media (max-width: 767px) {
    .container {
        padding: 0 10px;
    }

    h1 { font-size: 2.4em; }
    h2 { font-size: 2em; }
    h3 { font-size: 1.4em; }

    .btn {
        padding: 10px 20px;
        font-size: 0.9em;
        min-width: 100px;
        letter-spacing: 0.5px;
    }

    .main-header {
        padding: 8px 0;
    }
    .navbar {
        padding: 0 10px;
    }
    .logo {
        font-size: 1.3em;
    }
    .logo img {
        height: 28px;
    }
    .nav-toggle {
        font-size: 1.4em;
    }
    .currency-toggle-button {
        padding: 6px 9px;
        font-size: 0.75em;
    }

    .search-container {
        margin-top: 10px;
        padding: 0 10px;
    }
    .search-input {
        padding: 8px 40px 8px 15px;
        font-size: 0.85em;
    }
    .search-button {
        right: 10px;
        width: 35px;
    }
    .search-results {
        left: 10px;
        width: calc(100% - 20px);
    }
    .search-results a {
        padding: 8px 12px;
        font-size: 0.85em;
    }
    .search-results a img {
        width: 25px;
        height: 25px;
    }

    .hero-section {
        padding: 35px 15px;
        min-height: 280px;
        margin: 15px auto;
    }
    .hero-section h1 {
        font-size: 2.5em;
    }
    .hero-section p {
        font-size: 1em;
        margin-bottom: 30px;
    }
    .section-title, .categories-section h2, .featured-products-section h2 {
        font-size: 2em;
        margin-bottom: 30px;
    }
    .categories-section,
    .featured-products-section,
    .products-page .products-section,
    .product-detail-section,
    .content-section {
        padding: var(--padding-section-mobile);
    }
    .category-list {
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 20px;
    }
    .category-card {
        padding: 15px;
    }
    .category-card img {
        width: 70px;
        height: 70px;
    }
    .category-card span {
        font-size: 0.95em;
    }

    .product-grid {
        grid-template-columns: 1fr; /* Single column on small mobiles */
        gap: 20px;
    }
    .product-card {
        max-width: 350px; /* Constrain width for single column */
        margin: 0 auto;
    }
    .product-card img {
        height: 160px;
    }
    .product-card .product-details {
        padding: 15px;
    }
    .product-card h3 {
        font-size: 1.1em;
        min-height: 40px;
    }
    .product-card .price {
        font-size: 1.2em;
    }
    .product-card .rating {
        font-size: 0.9em;
    }
    .product-card .buy-btn {
        padding: 9px 12px;
        font-size: 0.9em;
    }
    .view-all-btn-container {
        margin-top: 30px;
    }

    .product-detail-content {
        padding: 20px;
        gap: 20px;
    }
    .product-image-gallery {
        max-height: 300px;
        padding: 15px;
    }
    .product-info h1 {
        font-size: 2em;
    }
    .product-info .price-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    .product-info #product-detail-price {
        font-size: 2.2em;
    }
    .product-info .original-price {
        font-size: 1em;
    }
    .product-info .discount-percent {
        font-size: 0.95em;
    }
    .product-info .rating {
        font-size: 1em;
    }
    .product-info p.description-text {
        font-size: 0.95em;
        margin-bottom: 20px;
    }
    .product-features h3 {
        font-size: 1.2em;
        margin-top: 20px;
    }
    .product-features ul li {
        font-size: 0.9em;
        padding-left: 25px;
    }
    .product-features ul li::before {
        font-size: 1.1em;
    }
    .action-buttons {
        flex-direction: column;
        gap: 15px;
        margin-top: 25px;
    }
    .buy-now-btn {
        font-size: 1em;
        padding: 12px 20px;
        min-width: 100%;
    }

    .content-section h1, .content-section h2 {
        font-size: 2em;
        margin-bottom: 30px;
    }
    .content-block {
        padding: 20px 25px;
        line-height: 1.6;
    }
    .content-block p, .content-block ul {
        font-size: 0.95em;
    }
    .contact-info li {
        font-size: 0.95em;
    }
    .contact-info li i {
        font-size: 1.1em;
    }

    .footer-content {
        padding: 0 10px;
        text-align: center;
        flex-direction: column;
        align-items: center;
    }
    .footer-column {
        max-width: 95%;
        min-width: unset;
    }
    .footer-column h3 {
        font-size: 1.1em;
    }
    .footer-column ul {
        padding: 0;
    }
    .footer-column ul li a {
        font-size: 0.9em;
    }
    .social-links {
        justify-content: center;
        margin-top: 15px;
    }
    .social-links a {
        font-size: 1.4em;
    }
}
