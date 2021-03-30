import {shortenText} from '../utils/functions';
import {wordCount, attachUserName} from '../../server/utils';
import {shortText, longText, posts, users} from './__data__/testData';
import { text } from 'express';

test('function shortenText should not alter a string under 100 characters', () => {
    expect(shortenText(shortText)).toHaveLength(29);
});

test('function shortenText should shorten text over 100 characters and add 3 periods at the end', () => {
    const shortened = shortenText(longText);
    expect(shortened).not.toHaveLength(longText.length);
    expect(shortened.slice(-3)).toBe('...');
});

test('function wordCount should return a total word count for a post', () => {
    expect(wordCount(posts)).toEqual(233);
});

test('function attachUserName should attach a displayName property to every post', () => {
    const newPosts = attachUserName(users, posts);
    expect(newPosts[0]).toHaveProperty('displayName');
});

test('function attachUserName should remove any posts with no matching user', () => {
    const newPosts = attachUserName(users, posts);
    const deletedPost = posts[5];
    expect(newPosts).not.toContainEqual(deletedPost);
});