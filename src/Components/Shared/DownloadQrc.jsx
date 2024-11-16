import { Icon } from '@iconify/react';
import React from 'react';

class ImageDownloader extends React.Component {
  downloadImage = () => {
    const { imageUrl, fileName } = this.props;

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  }

  render() {
    return (
      <>
        <button
          onClick={this.downloadImage}
          className=" bg-primary hover:bg-primary/80 flex items-center justify-center duration-300 w-[38px] h-[38px] rounded-[4px] text-[14px] font-medium text-white"
        >
          <Icon
            icon="lucide:arrow-down-to-line"
            className=" text-[25px]"
          />
        </button>
      </>
    );
  }
}

export default ImageDownloader;
