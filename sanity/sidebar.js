import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// Build custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // Create a new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // Make a document id so we don't have a ranom string of numbers
            .documentId('downtown')
        ),
      // Add in the rest of the document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
