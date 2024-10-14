import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderContext } from '../../context/HeaderContext';
import '../../css/components/header/header.css';
import '../../css/components/header/menu.css';

const HeaderMenu = () => {
    const { activeMenu, closeMenu, setMenuOpen } = useContext(HeaderContext);
    const sideMenuRef = useRef(null);
    const location = useLocation();
    const [showGenderSection, setShowGenderSection] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [isClickable, setIsClickable] = useState(true);

    // Cerrar el menú cuando la ruta cambie
    useEffect(() => {
        setMenuOpen(false); // Cerrar el menú
    }, [location.pathname, setMenuOpen]); // Ejecutar el efecto cuando la ubicación cambie

    const handleGenderClick = (gender) => {
        if (!isClickable) return;
        // Alternar la sección de género al hacer clic
        setShowGenderSection((prev) => (prev === gender ? '' : gender));
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

    // Nueva función para manejar el clic en un enlace
    // Nueva función para manejar el clic en un enlace
const handleLinkClick = () => {
    setMenuOpen(false); // Reiniciar el estado a false
    handleCloseMenu(); // Cerrar el menú

    // Desplazar la ventana a la parte superior de forma inmediata
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
                <button className="filterButton" onClick={() => handleGenderClick('Hombre')}>Hombre</button>
                <button className="filterButton" onClick={() => handleGenderClick('Mujer')}>Mujer</button>
            </div>

            {showGenderSection && (
                <div className={`genderSection ${activeMenu === 'sideMenu' ? 'open' : 'close'}`}>
                    <h3>Productos de {showGenderSection}</h3>
                    <div className="productNav">
                        {showGenderSection === 'Mujer' && (
                            <>
                                <Link to="/woman-bags" onClick={handleLinkClick}>Bolsos</Link>
                                <Link to="/woman-collection" onClick={handleLinkClick}>Winter Collection</Link>
                                <Link to="/woman-shoes" onClick={handleLinkClick}>Zapatos</Link>
                            </>
                        )}
                        {showGenderSection === 'Hombre' && (
                            <>
                                <Link to="/man-bags" onClick={handleLinkClick}>Bolsos</Link>
                                <Link to="/man-collection" onClick={handleLinkClick}>Ropa</Link>
                                <Link to="/man-shoes" onClick={handleLinkClick}>Zapatos</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default HeaderMenu;
