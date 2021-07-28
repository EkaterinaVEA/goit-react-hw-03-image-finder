import PropTypes from 'prop-types';
import { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styles';
import defaultImage from '../images/defaultImage.jpg';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onImageSelect: PropTypes.func.isRequired,
  };

  state = {
    loaded: false,
  };

  handleImageLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;
    const { webformatURL, tags, onImageSelect } = this.props;
    return (
      <Item>
        <Image
          src={loaded ? webformatURL : defaultImage}
          alt={tags}
          onClick={onImageSelect}
          onLoad={this.handleImageLoad}
        />
      </Item>
    );
  }
}
