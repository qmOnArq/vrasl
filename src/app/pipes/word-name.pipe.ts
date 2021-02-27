import { Pipe, PipeTransform } from '@angular/core';
import { AslWord } from '../definitions/asl-words';
import { AslWordsDefinitions } from '../definitions/asl-words-definitions';

@Pipe({ name: 'wordName', pure: true })
export class WordNamePipe implements PipeTransform {
    transform(word?: AslWord) {
        if (!word) {
            return '';
        }

        const wordDefinition = AslWordsDefinitions[word];
        return wordDefinition.name ?? (word.startsWith('ASL-') ? word.substr(4, word.length) : word);
    }
}
