import React from 'react';
import { File, Input, Avatar, HorizontalScroll, Spinner, Div } from '@vkontakte/vkui';
import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import { ImageApiService } from '../../services/ImageApiService';
import { environment } from '../../config/environment';


import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';


type ImageUploaderProps = {
  top: string;
  name: string;
  label: string;
  uploadedFiles?: any;
};

const itemStyle = {
  flexShrink: 0,
  width: 70,
  height: 70,
  display: 'flex',
  flexDirection:
    'column',
  alignItems: 'center',
  fontSize: 12,
};

export class ImageUploader extends React.PureComponent<ImageUploaderProps> {
  state = {
    value: '',
    files: [],
  };

  componentDidMount () {
    if (this.props.uploadedFiles) {
      this.setState({
        value: this.props.uploadedFiles,
        files: this.props.uploadedFiles.map((id) => {
          return {
            fetching: false,
            file: {
              name: id,
            },
            id,
          };
        }),
      });
    }
  }

  handleChange = (event) => {
    const files = [
      ...this.state.files,
    ];

    for (let file of event.target.files) {
      let fileIndex = files.push({
        uploading: true,
        file,
      }) - 1;

      ImageApiService.uploadImage(file).then((id) => {
        const files = [...this.state.files];

        files[fileIndex] = {
          ...files[fileIndex],
          uploading: false,
          id,
        };

        this.setState({
          files: files,
          value: files.map((item) => item.id).filter(item => !!item).join(','),
        });
      });
    }

    this.setState({
      files,
    });
  };

  removeFile = (id) => {
    return () => {
      const files = [...this.state.files];

      const index = files.findIndex((item) => item.id === id);

      files.splice(index, 1);

      this.setState({
        files: [...files],
        value: files.map((item) => item.id).filter(item => !!item).join(','),
      });
    };
  };

  render () {
    return (
      <React.Fragment>
        { this.state.files.length > 0 && <HorizontalScroll>
          <Div style={ { display: 'flex' } }>
            { this.state.files.map((file) => {
              return (
                <div style={ { ...itemStyle } }
                     onClick={ file.id && this.removeFile(file.id) }
                     key={ file.file.name }>
                  <Avatar src={ file.id ? `${environment.apiUrl}/image/${file.id}` : null } type={ 'app' } size={ 64 }
                          style={ { color: '#fff' } }>

                    <div style={ {
                      width: '100%',
                      height: '100%',
                      'position': 'absolute',
                      background: 'rgba(0,0,0,.3)',
                      borderRadius: '9px',
                      zIndex: -1,
                    } }>
                    </div>

                    { file.uploading && <Spinner/> }


                    { file.id && <div style={ { color: '#fff' } }><Icon24Cancel/></div> }
                  </Avatar>
                </div>
              );
            }) }
          </Div>
        </HorizontalScroll>
        }

        <File top={ this.props.top }
              before={ <Icon24Camera/> }
              onChange={ this.handleChange }
              size="l">
          { this.props.label }

          <div style={ { display: 'none', position: 'absolute' } }>
            <Input type='text'
                   name={ this.props.name }
                   value={ this.state.value }/>
          </div>
        </File>
      </React.Fragment>
    );
  }
}
