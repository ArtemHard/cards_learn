import React from "react"
import { InputTypeFile } from "components/Inputs/InputTypeFile"
import { ImgHTMLAttributes, HTMLAttributes } from "react"
import styled from "styled-components"
import brokenImg from "../../common/assets/icons/brokenImg.jpg"

export type AddImgProps = {
  childrenTitleLeft: string
  callback: (file: string) => void
  marginBottom?: string
  src?: string
}

export const AddImg = ({ childrenTitleLeft, marginBottom, callback, src }: AddImgProps) => {
  return (
    <AddImgWrapper style={{ marginBottom: marginBottom }}>
      <TitlesWrapper>
        <Text>{childrenTitleLeft}</Text>
        <InputTypeFile callback={callback} type="link">
          Change cover
        </InputTypeFile>
      </TitlesWrapper>
      <ImageCard src={src ? src : undefined} />
    </AddImgWrapper>
  )
}

type AddImgWrapperProps = HTMLAttributes<HTMLDivElement>
const AddImgWrapper = styled.div<AddImgWrapperProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.style?.marginBottom};
`
const TitlesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`

const Image = styled.img.attrs<ImageCardProps>((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  max-width: 400px;
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "119px"};
  background-color: #a5f1e9;
  display: flex;
  align-items: center;
  object-fit: contain;
`

type ImageCardProps = {
  width?: string
  height?: string
} & ImgHTMLAttributes<HTMLImageElement>

export const ImageCard: React.FC<ImageCardProps> = (props) => {
  const [isAvaBroken, setIsAvaBroken] = React.useState(false)
  const errorHandler = () => {
    setIsAvaBroken(true)
  }

  return <Image {...props} src={isAvaBroken ? brokenImg : props.src} onError={errorHandler} />
}

const Text = styled.span`
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`
