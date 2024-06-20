import {useState, useRef} from 'react';
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteSelectEvent,
} from 'primereact/autocomplete';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router-dom';
import styles from './SearchBar.module.css';

export const SearchBar = ({
  handleOnChange,
  drugs,
  name,
}: {
  handleOnChange: (drugName: string) => void;
  drugs: any[];
  name: string;
}) => {
  const [drugName, setDrugName] = useState<string>('');
  const navigate = useNavigate();

  const ref = useRef(null);

  const onChange = (e: AutoCompleteChangeEvent) => {
    setDrugName(e.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleOnChange(drugName);
      if (drugs) {
        // @ts-ignore - Property 'show' does not exist on type 'never'.
        ref?.current?.show();
      }
    }
  };

  const handleSelect = (e: AutoCompleteSelectEvent) => {
    // @ts-ignore
    navigate(`/drugs/${name}`, {state: {name: e.value}});
  };

  return (
    <div>
      <AutoComplete
        inputClassName={styles.autocompleteInput}
        panelClassName={styles.autocompletePanel}
        onChange={onChange}
        value={drugName}
        onKeyDown={handleKeyDown}
        suggestions={drugs}
        completeMethod={() => {}}
        ref={ref}
        onFocus={() => {
          if (drugs) {
            // @ts-ignore - Property 'show' does not exist on type 'never'.
            ref?.current?.show();
          }
        }}
        onSelect={handleSelect}
      />
      <Button
        className={styles.button}
        icon="pi pi-search"
        aria-label="search"
        onClick={() => {
          handleOnChange(drugName);
          // @ts-ignore - Property 'show' does not exist on type 'never'.
          ref?.current?.show();
        }}
      />
    </div>
  );
};
