import styled from 'styled-components';

export const UploadContainer = styled.div`
    width: 100%;
`;
export const DropZone = styled.label`
    border-radius: 6px;
    border: 3px ${props => props.borderStyle || 'solid'} #999;
    padding: 16px 8px;
`;
export const ImageContainer = styled.div`
    padding: 8px;
    align-items: center;
`;
export const Image = styled.div`
    width: 150px;
    height: 150px;
    margin: 16px;
    background-image: url(${props => props.src || ''});
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    float: left;
`;