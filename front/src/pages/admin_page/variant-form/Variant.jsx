import React, { useState } from 'react';
import '../../../css/pages/admin.css'

export const Variant = () => {
    const [sizes, setSizes] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [error, setError] = useState('');
    const [variantCount, setVariantCount] = useState(0);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(null);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [variants, setVariants] = useState([{
        color: { colorName: '', hexCode: '' },
        size: [],
        file: [],
        material: '',
        price: '',
        discount: 0,
        image: [],
        is_main: false,
        description: '',
    }]);
    const [currentSize, setCurrentSize] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [currentVariant, setCurrentVariant] = useState({
        color: { colorName: '', hexCode: '' },
        size: [],
        file: [],
        material: '',
        price: '',
        discount: 0,
        image: [],
        is_main: false,
        description: '',
    });

    const handleVariantChange = (e, index) => {
        const { id, value } = e.target;

        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            const currentVariant = { ...updatedVariants[index] };

            if (id.includes('.')) {
                const [parentKey, childKey] = id.split('.');
                currentVariant[parentKey] = {
                    ...currentVariant[parentKey],
                    [childKey]: value,
                };
            } else {
                currentVariant[id] = value;
            }

            updatedVariants[index] = currentVariant;
            return updatedVariants;
        });
    };


    const validateVariant = (variant) => {
        if (!variant.name || !variant.color.colorName || !variant.color.hexCode || !variant.price) {
            setError('Por favor, complete todos los campos requeridos.');
            return false;
        }
        if (isNaN(variant.price)) {
            setError('El precio debe ser un número válido.');
            return false;
        }
        if (isNaN(variant.discount)) {
            setError('El descuento debe ser un número válido.');
            return false;
        }
        setError('');
        return true;
    };


    const addImage = (url) => {
        if (!url) return;
        setCurrentVariant((prev) => ({
            ...prev,
            image: [...prev.image, url],
        }));
    };

    const handleImageUploadChange = (e, index) => {
        const files = Array.from(e.target.files);
        const newUrls = files.map((file) => URL.createObjectURL(file));
        const newFileNames = files.map((file) => file.name);
    
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            const variant = updatedVariants[index];
            // Evita duplicados con `Set`
            if (!Array.isArray(variant.file)) {
                variant.file = []; // Garantiza que siempre sea un array
            }
            variant.image = [...new Set([...variant.image, ...newUrls])];
            variant.file = [...new Set([...variant.file, ...newFileNames])];
            return updatedVariants;
        });
    };
    


    const handleImageChange = (e, index) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));

        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index].image = imageUrls;
            return updatedVariants;
        });

        const fileNames = files.map((file) => file.name);
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index].file = fileNames;
            return updatedVariants;
        });
    };


    const handleSizeChange = (e, index) => {
        const size = e.target.value.toUpperCase();
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            if (updatedVariants[index]) {
                updatedVariants[index].size = updatedVariants[index].size || [];
                if (!updatedVariants[index].size.includes(size)) {
                    updatedVariants[index].size.push(size);
                }
            }
            return updatedVariants;
        });
    };

    const handleDeleteVariant = (index) => {
        setVariants((prevVariants) => {
            const updatedVariants = prevVariants.filter((_, i) => i !== index);
            return updatedVariants;
        });
    };

    const handleAddSize = (index) => {
        if (!currentSize.trim()) {
            alert('Por favor, ingrese una talla válida.');
            return;
        }

        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            if (!updatedVariants[index].size) {
                updatedVariants[index].size = [];
            }
            if (updatedVariants[index].size.includes(currentSize)) {
                return updatedVariants;
            }
            updatedVariants[index].size = [...updatedVariants[index].size, currentSize];
            return updatedVariants;
        });

        setCurrentSize(''); // Limpia el input después de añadir la talla
    };




    const handleDeleteSize = (sizeToRemove, index) => {
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index].size = updatedVariants[index].size.filter((size) => size !== sizeToRemove);
            return updatedVariants;
        });
    };

    const generateImageFolderPath = (product, variant) => {
        const type = product?.type || 'unknownType';
        const gender = product?.gender || 'unknownGender';
        const name = variant?.name || 'unknownProduct';
        const colorName = variant?.color?.colorName || 'unknownColor';
        return `${gender}/${type}/${name}/${colorName}`;
    };

    const handleAddImageInput = (index) => {
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];

            if (!updatedVariants[index].image) {
                updatedVariants[index].image = [];
            }

            if (updatedVariants[index].image[updatedVariants[index].image.length - 1] === '') {
                return updatedVariants;
            }

            updatedVariants[index].image.push('');
            return updatedVariants;
        });
    };

    const handleDeleteImageInput = (index, urlIndex) => {
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index].image = updatedVariants[index].image.filter((_, i) => i !== urlIndex);
            return updatedVariants;
        });
    };

    const handleImageUrlChange = (index, urlIndex, value) => {
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index].image[urlIndex] = value;
            return updatedVariants;
        });
    };

    const saveVariant = (index) => {
        if (validateVariant()) {
            setVariants((prevVariants) => {
                const updatedVariants = [...prevVariants];
                updatedVariants[index] = { ...currentVariant };
                return updatedVariants;
            });

            setCurrentVariant({
                color: { colorName: '', hexCode: '' },
                size: [],
                material: '',
                price: '',
                discount: 0,
                image: [],
                is_main: false,
                description: '',
            });
        }
    };

    const resetCurrentVariant = () => {
        setCurrentVariant({
            color: { colorName: '', hexCode: '' },
            size: [],
            material: '',
            price: '',
            discount: 0,
            image: [],
            is_main: false,
            description: '',
        });
        setSelectedVariantIndex(null);
    };

    const handleSaveImageUrlsToBackend = (e, index) => {
        const files = Array.from(e.target.files);
        const realImageUrls = files.map((file) => uploadImageToServer(file));

        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index].image = realImageUrls;
            return updatedVariants;
        });
    };

    const handleSaveEdit = () => {
        if (validateVariant(currentVariant)) {
            const updatedVariants = [...variants];
            updatedVariants[selectedVariantIndex] = currentVariant;
            setVariants(updatedVariants);
            resetCurrentVariant();
        }
    };

    const addNewVariantForm = () => {
        setVariants((prevVariants) => [
            ...prevVariants,
            {
                color: { colorName: '', hexCode: '' },
                size: [],
                material: '',
                price: '',
                discount: 0,
                image: [],
                is_main: false,
                description: '',
            },
        ]);
    };


    const addNewVariantAccordion = (e) => {
        e.preventDefault();

        if (validateVariant()) {
            setVariants((prevVariants) => [
                ...prevVariants,
                { ...currentVariant },
            ]);
        }

        setCurrentVariant({
            color: { colorName: '', hexCode: '' },
            size: [],
            material: '',
            price: '',
            discount: 0,
            image: [],
            is_main: false,
            description: '',
        });

        setVariantCount((prevCount) => prevCount + 1);
    };

    const handleVariantClick = (index) => {
        if (index >= 0 && index < variants.length) {
            setSelectedVariantIndex(index);
            setCurrentVariant(variants[index]);
        }
    };

    return (
        <>
            <div className="godDiv">
                <div className={`accordionContainer ${activeAccordion === 'variant' ? 'open' : ''}`}>
                    {variants.map((variant, index) => (
                        <div className="godSon" key={index}>
                            <div className="createVariant_Container">
                                <div className="containerTittle_AdminContainer">
                                    <div className="containerTittle_Admin">
                                        <h2 className='text_createVariant' onClick={() => setActiveAccordion('variant')}>
                                            Variante {index + 1}
                                        </h2>
                                    </div>
                                </div>

                                <div className="variant">
                                    <div className="variantForm">
                                        <div className="divForm_Column">
                                            <label htmlFor="colorName">Name:</label>
                                            <input
                                                name="name"
                                                type="text"
                                                id="name"
                                                value={currentVariant.name}
                                                onChange={handleVariantChange}
                                            />
                                        </div>
                                        <div className="divForm_Column">
                                            <label htmlFor="colorName">Color Name:</label>
                                            <input
                                                name="colorName"
                                                type="text"
                                                id="color.colorName"
                                                value={variants[index]?.color?.colorName || ''}
                                                onChange={(e) => handleVariantChange(e, index)}
                                            />
                                        </div>
                                        <div className="divForm_Column">
                                            <label htmlFor="hexCode">Hex Code:</label>
                                            <input
                                                type="text"
                                                id="color.hexCode"
                                                value={variants[index]?.color?.hexCode || ''}
                                                onChange={(e) => handleVariantChange(e, index)}
                                            />
                                        </div>
                                        <div className="divForm_Column">
                                            <label htmlFor="material">Material:</label>
                                            <input
                                                name='material'
                                                type="text"
                                                id="material"
                                                value={variants[index]?.material || ''}
                                                onChange={(e) => handleVariantChange(e, index)}
                                            />
                                        </div>

                                        <div className="divForm_Column">
                                            <label htmlFor="size">Talla:</label>
                                            <input
                                                type="text"
                                                id="size"
                                                placeholder="Ej: M"
                                                value={currentSize} // Vincula el valor al estado actual
                                                onChange={(e) => setCurrentSize(e.target.value.toUpperCase())} // Actualiza el estado de la talla
                                            />
                                            <div className="sizeContainer_Button">
                                                <button
                                                    className="submitEditProductButton"
                                                    onClick={() => handleAddSize(index)}
                                                >
                                                    Enviar talla
                                                </button>
                                            </div>
                                            <div className="containerSize_Display">
                                                <ul className="sizeDisplay">
                                                    {variants[index]?.size.map((size, idx) => (
                                                        <li key={idx} className="sizeSelected_Group">
                                                            {size}
                                                            <button
                                                                className="deleteSize_Button"
                                                                onClick={() => handleDeleteSize(size, index)}
                                                            >
                                                                X
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="divForm_Column">
                                            <div className="introduceImage">
                                                <label htmlFor={`image-${index}`} className="labelImage">Subir Imagen</label>
                                                <input
                                                    name="image"
                                                    type="file"
                                                    multiple
                                                    id={`image-${index}`}
                                                    className="inputImage"
                                                    onChange={(e) => handleImageUploadChange(e, index)}
                                                />
                                            </div>
                                            <div className="containerForPreviews">
                                                {variants[index]?.image.map((imageUrl, imgIndex) => (
                                                    <div key={imgIndex} className="imagePreview">
                                                        <img
                                                            src={imageUrl}
                                                            alt={`Preview ${imgIndex}`}
                                                            className="previewImage"
                                                        />
                                                        <p className="fileName">{variants[index]?.file[imgIndex]}</p>
                                                        <button
                                                            className="deleteImage_Button"
                                                            onClick={() => handleDeleteImageInput(index, imgIndex)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="divForm_Column">
                                            <label htmlFor="price">Precio:</label>
                                            <input
                                                type="number"
                                                id="price"
                                                value={variants[index]?.price || ''}
                                                onChange={(e) => handleVariantChange(e, index)}
                                            />
                                        </div>
                                        <div className="divForm_Column">
                                            <label htmlFor="discount">Descuento:</label>
                                            <input
                                                name='discount'
                                                type="number"
                                                id="discount"
                                                value={variants[index]?.discount || ''}
                                                onChange={(e) => handleVariantChange(e, index)}
                                            />
                                        </div>
                                        <div className="divForm_Column">
                                            <label htmlFor="description">Descripción:</label>
                                            <textarea
                                                id="description"
                                                value={variants[index]?.description || ''}
                                                onChange={(e) => handleVariantChange(e, index)}
                                            />
                                        </div>

                                        <div className="divForm_Column">
                                            <label htmlFor="is_main">¿Es Principal?</label>
                                            <input
                                                type="checkbox"
                                                id="is_main"
                                                value={variants[index]?.is_main || ''}
                                                onChange={(e) => handleVariantChange(e, index)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container_ButtonSubmitContainer">
                                <div className="submitEdition">
                                    <button className="submitCreateButton" onClick={() => handleDeleteVariant(index)}>Eliminar variante</button>
                                </div>
                            </div>
                        </div>


                    ))}

                </div>
            </div>


            <div className="container_ButtonSubmit">
                <div className="container_ButtonSubmitContainer">

                    <div className="submitEdition">
                        <button className="submitCreateButton" onClick={addNewVariantForm}>Agregar Nueva Variante</button>
                    </div>

                    <div className="submitEdition">
                        <button className="submitCreateButton" onClick={addNewVariantAccordion}>Enviar Producto</button>
                    </div>
                </div>
            </div>
        </>
    );
};