# Kwaesok
The quick and simple memo

## Website link
https://kwaesok.vercel.app

## Technologies used in this project

### Selection API

```ts
const handlePasteWithSelectionApi = async (
    e: React.ClipboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
```

Here's the English translation of your explanation:

This code implements a function to convert rich text copied from other pages into plain text and paste it.

- It uses `e.preventDefault()` to block the browser's default paste behavior.

- It extracts clipboard content as pure text format only through `e.clipboardData.getData('text/plain')`.

- It uses the Selection API (`window.getSelection()`) to accurately identify the current cursor position or selected area.

- It utilizes the Range API (`selection.getRangeAt(0)`) to specify the exact location to insert the text.

- It inserts the converted plain text into the document through DOM manipulation (`document.createTextNode()`, `range.insertNode()`).

- Finally, it resets the cursor position to after the newly inserted text.

This method removes all styles, HTML tags, and metadata from the copied rich text, converting it to plain text before pasting.


### next-themes
Used for universal dark mode support.

## License
MIT LICENSE &copy; 2025 Cha Haneum