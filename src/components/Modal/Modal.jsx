import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled, Image, CloseBtn } from './Modal.styles';
import { RiCloseCircleLine } from 'react-icons/ri';
import Spinner from '../Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.objectOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    loaded: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { onClose } = this.props;

    if (e.code === 'Escape') {
      onClose();
    }
  };

  handleOverlayClick = e => {
    const { onClose } = this.props;

    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  handleImageLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { image, onClose } = this.props;
    const { loaded } = this.state;

    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalStyled>
          <Image
            src={image.src}
            alt={image.alt}
            onLoad={this.handleImageLoaded}
          />
          {loaded ? (
            <CloseBtn onClick={onClose}>
              <RiCloseCircleLine size="30" />
            </CloseBtn>
          ) : (
            <Spinner />
          )}
        </ModalStyled>
      </Overlay>,
      modalRoot,
    );
  }
}
