export default function timeAgo(createdTime) {
    // console.log(createdTime)
    const date = new Date(createdTime);
    const now = new Date();
    const diffMS = now.getTime() - date.getTime(); // difference in milliseconds
    const diffSeconds = Math.floor(diffMS / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const sameYear = now.getFullYear() === date.getFullYear();
    const options = sameYear ? { month: 'short', day: 'numeric' } : { month: 'short', day: 'numeric', year: 'numeric'};

    if (diffSeconds < 60) {
        return `Just Now`;
    } else if (diffMinutes < 60) {
        return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hours ago`;
    } else if (diffDays < 6) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleString("en-US", options);
    }

    
} 