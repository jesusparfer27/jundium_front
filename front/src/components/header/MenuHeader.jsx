import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderContext } from '../../context/HeaderContext';
import '../../css/components/header/header.css';
import '../../css/components/header/menu.css';

// IMAGENES DE HEADERMENU
import ManSectionHeader from '../../assets/header-sections/example-menu-header-man-section.jpg';
import WomanSectionHeader from '../../assets/header-sections/example-menu-header-woman-section.jpg';
import CollectionsSectionHeader from '../../assets/header-sections/example-menu-home-collections.jpg';
import DiscountSectionHeader from '../../assets/header-sections/example-menu-header-man-section.jpg'; // Imagen repetida para descuentos

const HeaderMenu = () => {
    const { activeMenu, closeMenu, setMenuOpen } = useContext(HeaderContext);
    const sideMenuRef = useRef(null);
    const location = useLocation();
    const [showGenderSection, setShowGenderSection] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [isClickable, setIsClickable] = useState(true);
    const [color, setColor] = useState('transparent');
    const [sectionImage, setSectionImage] = useState('');

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname, setMenuOpen]);

    const handleGenderClick = (gender) => {
        if (!isClickable) return;
        setShowGenderSection((prev) => (prev === gender ? '' : gender));

        switch (gender) {
            case 'Hombre':
                setColor('#E0F7FA');
                setSectionImage(ManSectionHeader);
                break;
            case 'Mujer':
                setColor('#FCE4EC');
                setSectionImage(WomanSectionHeader);
                break;
            case 'Colecciones':
                setColor('#E8F5E9');
                setSectionImage(CollectionsSectionHeader);
                break;
            case 'Descuentos':
                setColor('#FFF3E0');
                setSectionImage(DiscountSectionHeader);
                break;
            default:
                setColor('transparent');
                setSectionImage('');
                break;
        }
    };

    const handleCloseMenu = () => {
        setIsClosing(true);
        setIsClickable(false);
        setTimeout(() => {
            closeMenu();
            setIsClosing(false);
            setIsClickable(true);
        }, 300);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
        handleCloseMenu();
        window.scrollTo(0, 0);
    };

    return (
        <>
            <div
                ref={sideMenuRef}
                className={`sideMenu ${activeMenu === 'sideMenu' ? 'open slideInHorizontal' : (isClosing ? 'close slideOutHorizontal' : '')}`}
            >
                <button className="closeMenu" onClick={handleCloseMenu}>X</button>
                <h2>Filtrar por:</h2>
                <button className="filterButtonMenu" onClick={() => handleGenderClick('Hombre')}>Hombre</button>
                <button className="filterButtonMenu" onClick={() => handleGenderClick('Mujer')}>Mujer</button>
                <button className="filterButtonMenu" onClick={() => handleGenderClick('Colecciones')}>Colecciones</button>
                <button className="filterButtonMenu" onClick={() => handleGenderClick('Descuentos')}>Descuentos</button>
                <div className="headerFooter">
                    <div className="soporte">
                        <div className="title-headerFooter">Soporte</div>
                        <Link to="/contact-us">Contact Us</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/terms">Terms and Conditions</Link>
                    </div>
                </div>
            </div>

            {showGenderSection && (
                <div 
                    className={`genderSection ${activeMenu === 'sideMenu' ? 'open' : 'close'}`}
                    style={{ backgroundColor: color }} 
                >
                    <div 
                        className="sectionImage"
                        style={{
                            backgroundImage: `url(${sectionImage})`, 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '90%',
                            height: '300px',
                            margin: '10px auto',
                        }}
                    ></div>
                    <h3 
                        style={{
                            color: 'black',
                            paddingLeft: '1rem',
                            paddingTop: '2rem'
                        }}
                    >
                        Productos de {showGenderSection}
                    </h3>
                    <div className="productNav">
                        {showGenderSection === 'Mujer' && (
                            <>
                                <Link to="/products?category=woman&subCategory=bags" onClick={handleLinkClick}>Bolsos</Link>
                                <Link to="/products?category=woman&subCategory=collection" onClick={handleLinkClick}>Winter Collection</Link>
                                <Link to="/products?category=woman&subCategory=shoes" onClick={handleLinkClick}>Zapatos</Link>
                            </>
                        )}
                        {showGenderSection === 'Hombre' && (
                            <>
                                <Link to="/products?category=man&subCategory=bags" onClick={handleLinkClick}>Bolsos</Link>
                                <Link to="/products?category=man&subCategory=clothing" onClick={handleLinkClick}>Ropa</Link>
                                <Link to="/products?category=man&subCategory=shoes" onClick={handleLinkClick}>Zapatos</Link>
                            </>
                        )}
                        {showGenderSection === 'Colecciones' && (
                            <>
                                <Link to="/products?category=collections&subCategory=new-arrivals" onClick={handleLinkClick}>Nuevas Llegadas</Link>
                                <Link to="/products?category=collections&subCategory=seasonal" onClick={handleLinkClick}>Colección de Temporada</Link>
                            </>
                        )}
                        {showGenderSection === 'Descuentos' && (
                            <>
                                <Link to="/products?category=discounts&subCategory=special-offers" onClick={handleLinkClick}>Ofertas Especiales</Link>
                                <Link to="/products?category=discounts&subCategory=clearance" onClick={handleLinkClick}>Liquidaciones</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default HeaderMenu;
