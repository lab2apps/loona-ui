import React from 'react';
import { File, Input } from '@vkontakte/vkui';
import Icon24Camera from '@vkontakte/icons/dist/24/camera';

type ImageUploaderProps = {
  top: string;
  name: string;
  label: string;
};

export class ImageUploader extends React.PureComponent<ImageUploaderProps> {
  state = {
    value: '',
  };

  render () {
    return (
      <React.Fragment>
        <File top={ this.props.top }
              before={ <Icon24Camera/> }
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
