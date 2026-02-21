/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// Utilities kept for future extensibility
export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
};