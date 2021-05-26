import React, { useState } from 'react'
import './css/styles.css';
import { UploadContainer, DropZone, Image, ImageContainer } from './css/styled-components.js'
import { uniqueId } from 'lodash'
import { AiOutlineClose, AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

const DropArea = ({ LoadedImages, maxImages }) => {
    const [SelectedImages, setSelectedImages] = useState(LoadedImages || []);
    const [DragEntered, setDragEntered] = useState(false);
    function _onChange(evt) {
        handleGetFileObject(evt.target.files)
        console.log(SelectedImages)
    }
    function handleDrop(e) {
        e.preventDefault();
        console.log('DragDrop', e.dataTransfer.files)
        handleGetFileObject(e.dataTransfer.files)
        setDragEntered(false)
    }
    function handleDragEnter(e) {
        e.preventDefault();
        console.log('DragEnter');
        setDragEntered(true)
    }
    function handleDragLeave(e) {
        e.preventDefault();
        console.log('DragLeave');
        setDragEntered(false)
    }
    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleGetFileObject(files) {
        let arr = [...SelectedImages]
        for (let index = 0; index < files.length; index++) {
            if (arr.length + 1 > maxImages) {
                console.error(`Maximo ${maxImages} imagens!`)
                break
            }
            if (files[index].type === "image/jpeg" || files[index].type === "image/jpg" ||
                files[index].type === "image/png") {
                arr.push({
                    'id': uniqueId(),
                    'name': files[index].name,
                    'url': URL.createObjectURL(files[index]),
                    'size': files[index].size
                })
            }
        }
        setSelectedImages(arr)
        console.log('selImg:', SelectedImages)
    }

    function handleRemoveSelectedImg(id) {
        setSelectedImages(SelectedImages.filter(img => img.id !== id))
    }

    function handleMoveImageToLeft(index) {
        let arrAux = [...SelectedImages];
        let aux = [];

        setSelectedImages([]);
        if (index === 0) {
            aux = arrAux[0];
            for (let index = 0; index <= arrAux.length; index++) {
                if (index < arrAux.length - 1) {
                    arrAux[index] = arrAux[index + 1]
                } else if (index === arrAux.length) {
                    arrAux[index - 1] = aux;
                }
            }
            setSelectedImages(arrAux);
        } else if (index > 0) {
            aux = arrAux[index - 1];
            arrAux[index - 1] = arrAux[index];
            arrAux[index] = aux;
            setSelectedImages(arrAux);
        }
    }
    function handleMoveImageToRight(index) {
        let arr = [...SelectedImages];
        let aux = [];
        setSelectedImages([]);
        if (index === arr.length - 1) {
            aux = arr[arr.length - 1];
            for (let index = arr.length - 1; index >= 0; index--) {
                if (index > 0) {
                    arr[index] = arr[index - 1];
                } else if (index === 0) {
                    arr[index] = aux;
                }
            }
            setSelectedImages(arr);
        } else if (index < arr.length - 1) {
            aux = arr[index + 1];
            arr[index + 1] = arr[index];
            arr[index] = aux;
            setSelectedImages(arr);
        }
    }
    return (
        <UploadContainer>
            <DropZone borderStyle={DragEntered ? 'dashed' : 'solid'}
                draggable='true'
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}>
                {`Clique ou Arraste imagens para fazer upload.`}
                <br />
                {`.JPG, .JPEG, .PNG  | Tamanho máximo 2mb.`}

                <input type="file" name="img" accept={".jpg,.jpeg,.png"}
                    multiple onChange={_onChange} style={{ display: 'none' }} />
            </DropZone>
            <ImageContainer>
                {
                    SelectedImages && (SelectedImages.map((el, index) => {
                        return (
                            <Image key={index} src={el.url} alt={el.name}>
                                <AiOutlineClose className="uploadImage-DeleteIcon" onClick={() => handleRemoveSelectedImg(el.id)} />
                                <AiFillCaretLeft className="uploadImage-OrderIcon uploadImage-LeftOrder"
                                    onClick={() => handleMoveImageToLeft(index)} size={30} />
                                <AiFillCaretRight className="uploadImage-OrderIcon uploadImage-RightOrder"
                                    onClick={() => handleMoveImageToRight(index)} size={30} />
                            </Image>
                        )
                    }))
                }
            </ImageContainer>
        </UploadContainer>
    )
}

export default DropArea;