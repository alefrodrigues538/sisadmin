import React from 'react'

import { Container, FileInfo, Preview, } from './styles';

import CircularProgressbar from 'react-circular-progressbar';



const FileList = () => {
    function handleDelete(evt) {
        evt.preventDefault();
    }
    return (
        <Container>
            <li>
                <FileInfo>
                    <Preview src="" />
                    <div>
                        <strong>profile.png</strong>
                        <span>64kb <button classname="btn btn-danger" onClick={handleDelete}>Excluir</button></span>
                    </div>
                </FileInfo>
                <div>
                    <CircularProgressbar
                        styles={{
                            root: { width: 24 },
                            path: { stroke: '#222' },
                        }}
                        strokeWidth={10}
                        percentage={60} />

                </div>
            </li>
        </Container>
    )
}

export default FileList;