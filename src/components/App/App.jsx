import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api } from '../../services/Api';

import { Section } from './App.styles';
import { Searchbar } from '../Searchbar/Searchbar';
import { Modal } from '../Modal/Modal';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Spinner from '../Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    selectedImage: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const images = await Api.getImages(searchQuery, page);
        if (!images.length) {
          throw new Error();
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolve',
        }));
      } catch (error) {
        this.setState({
          status: 'rejected',
        });
        toast.warning(`Not Found any images by query: ${searchQuery}`);
      }

      page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
    }
  }

  onSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      toast.info('Please, enter query!');
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImage: null,
      status: 'idle',
    });
  };

  onModalClose = () => {
    this.setState({ selectedImage: null });
    document.body.classList.remove('modal-open');
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImageSelect = (src, alt) => {
    this.setState({ selectedImage: { src, alt } });
    document.body.classList.add('modal-open');
  };

  render() {
    const { images, status, selectedImage } = this.state;

    if (status === 'idle') {
      return (
        <Section>
          <Searchbar onSubmit={this.onSubmit} />
        </Section>
      );
    }

    if (status === 'pending') {
      return (
        <Section>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery images={images} onImageSelect={this.onImageSelect} />
          <Spinner />
          {images.length > 0 && <Button onClick={this.onLoadMore} />}
        </Section>
      );
    }

    if (status === 'resolve') {
      return (
        <Section>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery images={images} onImageSelect={this.onImageSelect} />
          {images.length > 0 && <Button onClick={this.onLoadMore} />}
          {selectedImage && (
            <Modal image={selectedImage} onClose={this.onModalClose} />
          )}
          <ToastContainer />
        </Section>
      );
    }

    if (status === 'rejected') {
      return (
        <Section>
          <Searchbar onSubmit={this.onSubmit} />
          <ToastContainer />
        </Section>
      );
    }
  }
}
